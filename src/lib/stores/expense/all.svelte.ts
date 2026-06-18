import { db } from '../db';
import { type Expense } from './types';

function createAllExpenseListStore() {
  let expenses: Expense[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get expenses() {
      return expenses;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch() {
      try {
        fetching = true;

        const expensesData = await db.expense.toArray();

        expensesData.sort((a, b) => (b?.date || '').localeCompare(a?.date || ''));

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

export const useAllExpenseListStore = createAllExpenseListStore();
