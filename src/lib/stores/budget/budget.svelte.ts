import type { Budget, BudgetFormData, BudgetWiseExpense } from './types';
import { DEFUALT_CURRENCY } from '../currency/currency-codes';
import { getExpenseUsedBudget } from '../expense/expense.svelte';
import type { ExportTripData } from '../trips/types';
import {
  addBudget,
  bulkDeleteBudget,
  deleteBudget,
  getTripBudgets,
  importBudget,
  updateBudget,
} from '$lib/api/budgets';

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
    async init(targetTripId: string) {
      try {
        fetching = true;

        data = await getTripBudgets(targetTripId);

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

        data = await addBudget(tripId, formData);

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

        data = await updateBudget(idToUpdate, formData);

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

        data = await deleteBudget(idToDelete);

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

        data = await bulkDeleteBudget(tripId);

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

        data = await importBudget(exportTripData);

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

export function getCurrencyWiseBudgetForTrip() {
  const targetBudget = useBudgetStore.data;

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
