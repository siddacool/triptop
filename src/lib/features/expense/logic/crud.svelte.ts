import { nanoid } from 'nanoid';
import {
  deleteExpense as deleteExpenseDb,
  bulkAddExpense,
  deleteBulkExpense,
  createExpense,
  updateExpense,
  getExpenseById,
  listTripExpenses,
} from '../db';
import type { Expense, ExpenseCreateData } from '../types';
import {
  validateDeleteExpenseByTripId,
  validateExpenseCreate,
  validateExpenseUpdate,
} from '../validation';
import { expenseDeatilStore } from '../store/detail.svelte';

export async function saveExpense(data: ExpenseCreateData | Expense) {
  if ('_id' in data) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { virtualData, name = '', ...restData } = data;
    const newData = {
      name: name.trim(),
      ...restData,
    };

    validateExpenseUpdate(newData);

    const id = await updateExpense(newData);

    await expenseDeatilStore.load(id);

    return id;
  } else {
    const { name = '', ...restData } = data;

    const newData = {
      name: name.trim(),
      ...restData,
    };

    validateExpenseCreate(newData);

    return await createExpense(newData);
  }
}

export function deleteExpense(id: string) {
  return deleteExpenseDb(id);
}

export async function deleteExpenseByTripId(tripId: string) {
  const tripExpenses = await listTripExpenses(tripId);

  if (!tripExpenses.length) {
    return;
  }

  const tripExpensesFiltred = tripExpenses.filter((item) => item.id);
  const tripExpensesKeys = tripExpensesFiltred.map((item) => item.id) as number[];

  validateDeleteExpenseByTripId(tripExpensesKeys);

  await deleteBulkExpense(tripExpensesKeys);

  return tripExpensesFiltred.map((item) => item._id);
}

async function updateExpenseFields(id: string, data: Partial<Expense>) {
  const expense = await getExpenseById(id);

  return saveExpense({
    ...expense,
    ...data,
  });
}

export function archiveExpense(id: string) {
  return updateExpenseFields(id, { archived: true });
}

export function unarchiveExpense(id: string) {
  return updateExpenseFields(id, { archived: false });
}

export async function addExpenseByTripId(tripId: string, expenses: Expense[]) {
  const newExpenses: Expense[] = [];

  const now = Date.now();

  for (let i = 0; i < expenses.length; i++) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { id, virtualData, ...expense } = expenses[i];

    newExpenses.push({
      ...expense,
      _id: nanoid(),
      tripId: tripId,
      createdAt: now,
      updatedAt: now,
    });
  }

  await bulkAddExpense(newExpenses);

  return newExpenses.map((item) => item._id);
}
