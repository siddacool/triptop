import { db } from '../db';
import { type Expense } from './types';

function createExpenseListStore() {
  let expenses: Expense[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get expensesAll() {
      return expenses;
    },
    get expenses() {
      return expenses.filter((item) => !item.archived);
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

        const expensesData = await db.expense.where({ tripId: tripId }).toArray();

        expenses = expensesData;

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
