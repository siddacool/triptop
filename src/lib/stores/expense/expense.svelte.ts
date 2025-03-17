import { db } from '../../db';
import {
  Category,
  type CategoryOption,
  type CurrencyWiseExpense,
  type Expense,
  type ExpenseDateGroup,
  type ExpenseFormData,
} from './types';
import { DEFUALT_CURRENCY } from '../currency/currency-codes';
import { DateFormats, getMoment } from '$lib/helpers/time';
import { useBudgetStore } from '../budget/budget.svelte';
import type { ExportTripData } from '../trips/types';
import {
  addExpense,
  bulkDeleteExpense,
  deleteExpense,
  getTripExpenses,
  importExpense,
  updateExpense,
} from '$lib/api/expenses';

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
    async init(targetTripId: string) {
      try {
        fetching = true;

        data = await getTripExpenses(targetTripId);

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

        data = await addExpense(tripId, expenseFormData);

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

        data = await updateExpense(idToUpdate, expenseFormData);

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

        data = await deleteExpense(idToDelete);

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

        data = await bulkDeleteExpense(tripId);

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

        data = await importExpense(exportTripData);

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
    newExpense.budgetName = targetBudget.name;
  }

  return newExpense;
}

export function getCurrencyWiseExpenseForTrip() {
  let targetExpenses = useExpenseStore.data;

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

export function filterExpenseByDateGroups(targetExpenses: Expense[]) {
  const expenses: ExpenseDateGroup[] = [];

  targetExpenses.forEach((item) => {
    const formattedDate = getMoment(item.date).format(DateFormats.YEAR_FIRST_STANDARD);
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

export function getExpenseDateGroups() {
  const targetExpenses = useExpenseStore.data;

  const expenses: ExpenseDateGroup[] = filterExpenseByDateGroups(targetExpenses);

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

export function getUniqueCurrency(expensesList: Expense[]) {
  const currenciesAll = getExpenseWithBudgetDetails(expensesList).map(
    (item) => item.currency || DEFUALT_CURRENCY.alphabeticCode,
  );

  const currencies: string[] = [];

  for (let index = 0; index < currenciesAll.length; index++) {
    const element = currenciesAll[index];

    if (currencies.includes(element)) {
      continue;
    }

    currencies.push(element);
  }

  return currencies.sort();
}
