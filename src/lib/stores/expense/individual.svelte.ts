import { useHistoricalCurrencyExchangeStore } from '../currency/exchange/historical.svelte';
import { db } from '../db';
import { updateExchangeDetails } from './decorators/update-exchange-details';
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
        if (fetching) {
          return;
        }

        fetching = true;

        const exchangeRate = useHistoricalCurrencyExchangeStore.exchangeRate;

        const data = await db.expense.where({ _id: expenseId }).first();

        if (!data?._id) {
          throw new Error('Expense not found');
        }

        if (data) {
          const amountHomeCurrency = updateExchangeDetails(data, exchangeRate);

          data.virtualData = {
            amountHomeCurrency,
          };
        }

        expense = data;

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
      expense = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseStore = createExpenseStore();
