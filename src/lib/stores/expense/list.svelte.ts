import { useLatestCurrencyExchangeStore } from '../currency/exchange/latest.svelte';
import { db } from '../db';
import { expensesListDecorator } from './decorators/list-decorator';
import { updateExchangeDetails } from './decorators/update-exchange-details';
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
    async fetch(tripId: string) {
      try {
        fetching = true;

        let expensesData = await db.expense.where({ tripId: tripId }).toArray();

        expensesData = expensesListDecorator(expensesData);

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
    updateExchangeData() {
      if (!expenses.length) {
        return;
      }

      const exchangeRate = useLatestCurrencyExchangeStore.exchangeRate;

      if (!exchangeRate) {
        return;
      }

      const newExpenses: Expense[] = [];

      for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        let virtualData = expense.virtualData || {};
        const filterFields = virtualData.filterFields;

        const amountHomeCurrency = updateExchangeDetails(expense, exchangeRate);

        virtualData = {
          ...virtualData,
          filterFields,
          amountHomeCurrency,
        };

        newExpenses.push({ ...expense, virtualData });
      }

      expenses = [...newExpenses];
    },
    reset() {
      expenses = [];
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseListStore = createExpenseListStore();
