import { db } from '$lib/db';
import type { Expense, ExpenseFormData } from '$lib/stores/expense/types';
import type { ExportTripData } from '$lib/stores/trips/types';
import { nanoid } from 'nanoid';

export async function getTripExpenses(tripId: string) {
  const expense = await db.expense.where({ tripId: tripId }).toArray();
  const ordered = expense.sort((a, b) => b?.date - a?.date);

  return ordered;
}

export async function getExpenseById(idToFind: string) {
  const expense = await db.expense.where({ _id: idToFind }).first();

  return expense;
}

export async function addExpense(tripId: string, formData: ExpenseFormData) {
  await db.expense.add({
    _id: formData._id ? formData._id : nanoid(),
    name: formData.name.trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    amount: formData.amount,
    tripId: tripId,
    budgetId: formData.budgetId,
    category: formData.category,
    date: formData.date,
    paymentMode: formData.paymentMode,
  });

  const data = await getTripExpenses(tripId);

  return data;
}

export async function updateExpense(expenseId: string, formData: ExpenseFormData) {
  const target = await getExpenseById(expenseId);

  if (!target) {
    throw Error('Expense:update: expense is missing');
  }

  await db.expense.update(target.id, {
    name: formData.name.trim(),
    amount: formData.amount,
    updatedAt: Date.now(),
    date: formData.date,
    category: formData.category,
    budgetId: formData.budgetId,
    paymentMode: formData.paymentMode,
  });

  const data = await getTripExpenses(target.tripId);

  return data;
}

export async function deleteExpense(expenseId: string) {
  const target = await getExpenseById(expenseId);

  if (!target) {
    throw Error('Expense:delete: expense is missing');
  }

  await db.expense.delete(target.id);

  const data = await getTripExpenses(target.tripId);

  return data;
}

export async function bulkDeleteExpense(tripId: string) {
  const relatedExpense = await getTripExpenses(tripId);
  const relatedExpenseKeys = relatedExpense.map((item) => item.id);

  let data = await getTripExpenses(tripId);

  if (!relatedExpenseKeys.length) {
    return Promise.resolve(data);
  }

  await db.expense.bulkDelete(relatedExpenseKeys);

  data = await getTripExpenses(tripId);

  return data;
}

export async function importExpense(exportTripData: ExportTripData) {
  const expenses = exportTripData.expense;

  const newExpenses: Expense[] = [];

  let data = await getTripExpenses(exportTripData.trip._id);

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

  data = await getTripExpenses(exportTripData.trip._id);

  return data;
}
