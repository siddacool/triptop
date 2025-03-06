import { nanoid } from 'nanoid';
import { db } from '../db';
import {
  Category,
  type CategoryOption,
  type CurrencyWiseExpense,
  type Expense,
  type ExpenseDateGroup,
  type ExpenseFormData,
} from './types';
import { DEFUALT_CURRENCY } from '../currency/currency-codes';
import { getMoment } from '$lib/helpers/time';
import { useBudgetStore } from '../budget/budget.svelte';
import type { ExportTripData } from '../trips/types';

async function getExpense(idToFind: string) {
  try {
    const trip = await db.expense.where({ _id: idToFind }).first();

    return Promise.resolve(trip);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const categoryOptions: CategoryOption[] = [
  {
    label: 'Food',
    value: Category.FOOD,
  },
  {
    label: 'Shopping',
    value: Category.SHOPPING,
  },
  {
    label: 'Tour',
    value: Category.TOUR,
  },
  {
    label: 'Transport',
    value: Category.TRANSPORT,
  },
  {
    label: 'Stay',
    value: Category.STAY,
  },
  {
    label: 'Flight',
    value: Category.FLIGHT,
  },
  {
    label: 'Entertainment',
    value: Category.ENTERTAINMENT,
  },
  {
    label: 'Mart',
    value: Category.MART,
  },
  {
    label: 'Misc',
    value: undefined,
  },
];

function createExpenseStore() {
  let data: Expense[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get data() {
      return data;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async init() {
      try {
        fetching = true;

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.date - a?.date);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    async add(tripId: string, expenseFormData: ExpenseFormData) {
      try {
        fetching = true;

        await db.expense.add({
          _id: expenseFormData._id ? expenseFormData._id : nanoid(),
          name: expenseFormData.name.trim(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          amount: expenseFormData.amount,
          tripId: tripId,
          budgetId: expenseFormData.budgetId,
          category: expenseFormData.category,
          date: expenseFormData.date,
          paymentMode: expenseFormData.paymentMode,
        });

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.date - a?.date);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, expenseFormData: ExpenseFormData) {
      try {
        fetching = true;

        const target = await getExpense(idToUpdate);

        if (!target) {
          throw Error('Expense:update: expense is missing');
        }

        await db.expense.update(target.id, {
          name: expenseFormData.name.trim(),
          amount: expenseFormData.amount,
          updatedAt: Date.now(),
          date: expenseFormData.date,
          category: expenseFormData.category,
          budgetId: expenseFormData.budgetId,
          paymentMode: expenseFormData.paymentMode,
        });

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.date - a?.date);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;

        const target = await getExpense(idToDelete);

        if (!target) {
          throw Error('Expense:delete: expense is missing');
        }

        await db.expense.delete(target.id);

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.date - a?.date);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async deleteAllExpensesFromTrip(tripId: string) {
      try {
        fetching = true;

        const relatedExpense = await db.expense?.where({ tripId }).toArray();
        const relatedExpenseKeys = relatedExpense.map((item) => item.id);

        if (!relatedExpenseKeys.length) {
          return Promise.resolve();
        }

        await db.expense.bulkDelete(relatedExpenseKeys);

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.date - a?.date);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.resolve();
      } finally {
        fetching = false;
      }
    },
    async import(exportTripData: ExportTripData) {
      try {
        fetching = true;

        const expenses = exportTripData.expense;

        const newExpenses: Expense[] = [];

        expenses.forEach((itemToUpdate) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...restItemProps } = itemToUpdate;

          const decoratedItem: Expense = { ...restItemProps };

          // Update group data
          const targetIndex = data.findIndex((item) => item._id === itemToUpdate._id);

          if (targetIndex < 0) {
            // New
            newExpenses.push(decoratedItem);
            return;
          }

          // Update approved
          newExpenses.push({
            ...data[targetIndex],
            ...decoratedItem,
          });
        });

        await db.expense.bulkPut(newExpenses);

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.date - a?.date);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const useExpenseStore = createExpenseStore();

export function attachBudgetDetailsToExpense(expense: Expense) {
  const targetBudget = useBudgetStore.data.find((item) => item._id === expense.budgetId);

  const newExpense = { ...expense };

  if (targetBudget) {
    newExpense.currency = targetBudget.currency;
    newExpense.paymentMode = targetBudget.paymentMode;
  }

  return newExpense;
}

export function getCurrencyWiseExpenseForTrip(tripId: string) {
  let targetExpenses = useExpenseStore.data.filter((item) => item.tripId === tripId);

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const expenses: CurrencyWiseExpense[] = [];

  targetExpenses.forEach((item) => {
    const itemCurrency = item.currency || DEFUALT_CURRENCY.alphabeticCode;

    const targetIndex = expenses.findIndex((item) => item.currency === itemCurrency);

    if (targetIndex < 0) {
      expenses.push({
        currency: itemCurrency,
        expenses: [item],
        total: item.amount,
      });
    } else {
      expenses[targetIndex].expenses.push(item);
      expenses[targetIndex].total += item.amount;
    }
  });

  return expenses.sort((a, b) => a.currency.localeCompare(b.currency));
}

export function getExpenseUsedBudget(budgetId: string) {
  const budgetUsed = useExpenseStore.data
    .filter((item) => item.budgetId === budgetId)
    .reduce((acc, obj) => acc + obj.amount, 0);

  return budgetUsed;
}

export function getExpenseDateGroups(tripId: string) {
  const targetExpenses = useExpenseStore.data.filter((item) => item.tripId === tripId);

  const expenses: ExpenseDateGroup[] = [];

  targetExpenses.forEach((item) => {
    const formattedDate = getMoment(item.date).format('YYYY-MM-DD');
    const targetIndex = expenses.findIndex((item) => item.date === formattedDate);

    if (targetIndex < 0) {
      expenses.push({
        date: formattedDate,
        expenses: [item],
      });
    } else {
      expenses[targetIndex].expenses.push(item);
    }
  });

  return expenses;
}

export function getCurrencyWiseExpense(expensesList: Expense[]) {
  let targetExpenses = expensesList;

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const expenses: CurrencyWiseExpense[] = [];

  targetExpenses.forEach((item) => {
    const itemCurrency = item.currency || DEFUALT_CURRENCY.alphabeticCode;

    const targetIndex = expenses.findIndex((item) => item.currency === itemCurrency);

    if (targetIndex < 0) {
      expenses.push({
        currency: itemCurrency,
        expenses: [item],
        total: item.amount,
      });
    } else {
      expenses[targetIndex].expenses.push(item);
      expenses[targetIndex].total += item.amount;
    }
  });

  return expenses.sort((a, b) => a.currency.localeCompare(b.currency));
}

export function getExpenseWithBudgetDetails(expensesList: Expense[]) {
  let targetExpenses = expensesList;

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  return targetExpenses;
}
