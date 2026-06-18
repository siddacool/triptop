import { db } from '../db';
import { addSearchFields } from './decorators/add-search-filelds';
import { useExpenseFiltersStore } from './filters.svelte';
import { getFilteredExpenses } from './getters/filtered-expenses';
import { type Expense } from './types';

function createExpenseListStore() {
  let expenses: Expense[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);
  const filtredExpenses = $derived(getFilteredExpenses(useExpenseFiltersStore.filters, expenses));

  return {
    get expenses() {
      return expenses;
    },
    get expensesActive() {
      return expenses.filter((item) => !item.archived);
    },
    get filtredExpenses() {
      return filtredExpenses;
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

        expenses = addSearchFields(expensesData);

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
