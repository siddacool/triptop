import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Expense, ExpenseCreateData } from '../types';
import { Category } from '../types/category';

export async function listTripExpenses(tripId: string) {
  const data = await db.expense.where({ tripId }).toArray();
  const sortedData = data.sort((a, b) => b.date.localeCompare(a.date));

  return sortedData;
}

export async function getExpenseById(id: string) {
  const expense = await db.expense.where({ _id: id }).first();

  if (!expense) {
    throw new Error('Expense not found');
  }

  return expense;
}

export async function createExpense(data: ExpenseCreateData) {
  const newExpenseId = nanoid();

  const now = Date.now();

  await db.expense.add({
    _id: newExpenseId,
    ...data,
    category: data.category || Category.OTHER,
    createdAt: now,
    updatedAt: now,
  });

  return newExpenseId;
}

export async function bulkAddExpense(expenses: Expense[]) {
  await db.expense.bulkAdd(expenses);

  return expenses;
}

export async function updateExpense(data: Expense) {
  await db.expense.update(data.id, {
    ...data,
    updatedAt: Date.now(),
  });

  return data._id;
}

export async function deleteExpense(id: string) {
  const expense = await getExpenseById(id);

  await db.expense.delete(expense.id);

  return id;
}

export async function deleteBulkExpense(ids: number[]) {
  await db.expense.bulkDelete(ids);

  return ids;
}
