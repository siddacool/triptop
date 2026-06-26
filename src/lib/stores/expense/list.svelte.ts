import type { CurrencyExchangeRate } from '../currency/types';
import { db } from '../db';
import { expensesListDecorator } from './decorators/list-decorator';
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
    get filtredExpenses() {
      return filtredExpenses;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripId: string, exchangeRate?: CurrencyExchangeRate | undefined) {
      try {
        fetching = true;

        let expensesData = await db.expense.where({ tripId: tripId }).toArray();

        expensesData = expensesListDecorator(expensesData, {
          exchangeRate,
        });

        expenses = expensesData;

        mounted = true;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      } finally {
        fetching = false;
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
