import type { Budget, BudgetFormData } from '$lib/stores/budget/types';
import { db } from '$lib/db';
import type { ExportTripData } from '$lib/stores/trips/types';
import { nanoid } from 'nanoid';

export async function getTripBudgets(tripId: string) {
  const budgets = await db.budget.where({ tripId }).toArray();
  const ordered = budgets.sort((a, b) => b?.createdAt - a?.createdAt);

  return ordered;
}

export async function getBudgetById(idToFind: string) {
  const budget = await db.budget.where({ _id: idToFind }).first();

  return budget;
}

export async function addBudget(tripId: string, formData: BudgetFormData) {
  await db.budget.add({
    _id: formData._id ? formData._id : nanoid(),
    name: formData.name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    paymentMode: formData.paymentMode,
    amount: formData.amount,
    currency: formData.currency,
    tripId,
  });

  const data = await getTripBudgets(tripId);

  return data;
}

export async function updateBudget(budgetId: string, formData: BudgetFormData) {
  const target = await getBudgetById(budgetId);

  if (!target) {
    throw Error('Budget:update: budget is missing');
  }

  await db.budget.update(target.id, {
    name: formData.name.trim(),
    amount: formData.amount,
    paymentMode: formData.paymentMode,
    currency: formData.currency,
    updatedAt: Date.now(),
  });

  const data = await getTripBudgets(target._id);

  return data;
}

export async function deleteBudget(budgetId: string) {
  const target = await getBudgetById(budgetId);

  if (!target) {
    throw Error('Budget:delete: budget is missing');
  }

  await db.budget.delete(target.id);

  const data = await getTripBudgets(target.tripId);

  return data;
}

export async function bulkDeleteBudget(tripId: string) {
  const relatedBudget = await getTripBudgets(tripId);
  const relatedBudgetKeys = relatedBudget.map((item) => item.id);

  let data = await getTripBudgets(tripId);

  if (!relatedBudgetKeys.length) {
    return Promise.resolve(data);
  }

  await db.budget.bulkDelete(relatedBudgetKeys);

  data = await getTripBudgets(tripId);

  return data;
}

export async function importBudget(exportTripData: ExportTripData) {
  const budgets = exportTripData.budget;

  let data = await getTripBudgets(exportTripData.trip._id);

  const newBudgets: Budget[] = [];

  budgets.forEach((itemToUpdate) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...restItemProps } = itemToUpdate;

    const decoratedItem: Budget = { ...restItemProps };

    // Update group data
    const targetIndex = data.findIndex((item) => item._id === itemToUpdate._id);

    if (targetIndex < 0) {
      // New
      newBudgets.push(decoratedItem);
      return;
    }

    // Update approved
    newBudgets.push({
      ...data[targetIndex],
      ...decoratedItem,
    });
  });

  await db.budget.bulkPut(newBudgets);

  data = await getTripBudgets(exportTripData.trip._id);

  return data;
}
