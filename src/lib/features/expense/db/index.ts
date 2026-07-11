import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Expense, ExpenseCreateData, ExpenseUpdateData } from '../types';
import { Category } from '../types/category';

export function listTripExpenses(tripId: string) {
  return db.expense.where({ tripId }).toArray();
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
    tripId: data.tripId,
    name: data.name.trim(),
    amount: data.amount,
    date: data.date,
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

export async function updateExpense(data: ExpenseUpdateData) {
  const id = data._id;

  const { name, ...restData } = data;

  const expense = await getExpenseById(id);

  if (!expense.id) {
    throw new Error('Expense not found');
  }

  await db.expense.update(expense.id, {
    name: name.trim(),
    ...restData,
    updatedAt: Date.now(),
  });

  return id;
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
