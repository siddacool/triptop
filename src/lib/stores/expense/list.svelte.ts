import { useHistoricalCurrencyExchangeStore } from '../currency/exchange/historical.svelte';
import { db } from '$lib/db';
import { expensesListDecorator } from './decorators/list-decorator';
import { useExpenseFiltersStore } from './filters.svelte';
import { getFilteredExpenses } from './getters/filtered-expenses';
import { type Expense } from './types';

export async function getExpenses(tripId: string) {
  return db.expense.where({ tripId }).toArray();
}

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
    async fetch(tripId: string) {
      try {
        if (fetching) {
          return;
        }

        fetching = true;

        const exchangeRate = useHistoricalCurrencyExchangeStore.exchangeRate;

        let expensesData = await getExpenses(tripId);

        expensesData = expensesData.sort((a, b) => b.date.localeCompare(a.date));

        expensesData = expensesListDecorator(expensesData, exchangeRate);

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
