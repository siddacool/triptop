import { db } from '../db';
import type { Expense } from './individual.svelte';

function createExpensesStore() {
  let data: Expense[] | undefined = $state(undefined);
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
    async fetch(tripId: string) {
      try {
        fetching = true;

        const expenses = await db.expense.where({ tripId: tripId }).toArray();
        data = expenses.sort((a, b) => b?.createdAt - a?.createdAt);

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
      data = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpensesStore = createExpensesStore();
