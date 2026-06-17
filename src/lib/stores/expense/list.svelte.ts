import { getGroupExpenses } from '$lib/helpers/group-expenses';
import { db } from '../db';
import { type Expense } from './types';

function createExpenseListStore() {
  let expenses: Expense[] = $derived([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get expenses() {
      return expenses;
    },
    get groupExpenses() {
      return getGroupExpenses(expenses);
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripId: string) {
      try {
        fetching = true;

        expenses = await db.expense.where({ tripId: tripId }).toArray();

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    reset() {
      expenses = [];
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseListStore = createExpenseListStore();
