import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Budget, BudgetFormData, BudgetWiseExpense } from './types';
import { DEFUALT_CURRENCY } from '../currency/currency-codes';
import { getExpenseUsedBudget } from '../expense/expense.svelte';
import type { ExportTripData } from '../trips/types';

async function getBudget(idToFind: string) {
  try {
    const trip = await db.budget.where({ _id: idToFind }).first();

    return Promise.resolve(trip);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createBudgetStore() {
  let data: Budget[] = $state([]);
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

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    async add(tripId: string, formData: BudgetFormData) {
      try {
        fetching = true;

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

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, formData: BudgetFormData) {
      try {
        fetching = true;

        const target = await getBudget(idToUpdate);

        console.log(target);

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

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

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

        const target = await getBudget(idToDelete);

        if (!target) {
          throw Error('Budget:delete: budget is missing');
        }

        await db.budget.delete(target.id);

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async deleteAllBudgetsFromTrip(tripId: string) {
      try {
        fetching = true;

        const relatedBudget = await db.budget?.where({ tripId }).toArray();

        const relatedBudgetKeys = relatedBudget.map((item) => item.id);

        if (!relatedBudgetKeys.length) {
          return Promise.resolve();
        }

        await db.budget.bulkDelete(relatedBudgetKeys);

        const unordered = await db.budget.toArray();

        data = unordered.sort((a, b) => b?.createdAt - a?.createdAt);

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

        const budgets = exportTripData.budget;

        for (const budget of budgets) {
          const budgetFormData: BudgetFormData = {
            _id: budget._id,
            name: budget.name,
            amount: budget.amount,
            paymentMode: budget.paymentMode,
            currency: budget.currency || DEFUALT_CURRENCY.alphabeticCode,
          };

          await this.add(exportTripData.trip._id, budgetFormData);
        }

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

export const useBudgetStore = createBudgetStore();

export function getCurrencyWiseBudgetForTrip(tripId: string) {
  const targetBudget = useBudgetStore.data.filter((item) => item.tripId === tripId);

  const budgets: BudgetWiseExpense[] = [];

  targetBudget.forEach((item) => {
    const itemCurrency = item.currency || DEFUALT_CURRENCY.alphabeticCode;

    const targetIndex = budgets.findIndex((item) => item.currency === itemCurrency);
    const budgetUsed = getExpenseUsedBudget(item._id);

    if (targetIndex < 0) {
      budgets.push({
        currency: itemCurrency,
        budgets: [item],
        total: item.amount,
        budgetUsed,
      });
    } else {
      budgets[targetIndex].budgets.push(item);
      budgets[targetIndex].total += item.amount;
    }
  });

  return budgets.sort((a, b) => a.currency.localeCompare(b.currency));
}
