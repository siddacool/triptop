import { db } from '../db';
import { type Expense } from './types';

function createExpenseStore() {
  let expense: Expense | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get expense() {
      return expense;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(expenseId: string) {
      try {
        fetching = true;

        expense = await db.expense.where({ _id: expenseId }).first();

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
      expense = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseStore = createExpenseStore();
