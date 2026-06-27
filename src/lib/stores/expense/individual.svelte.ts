import { useLatestCurrencyExchangeStore } from '../currency/exchange/latest.svelte';
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

        const data = await db.expense.where({ _id: expenseId }).first();

        if (!data?._id) {
          throw new Error('Expense not found');
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
    updateExchangeData() {
      if (!expense) {
        return;
      }

      const exchangeRate = useLatestCurrencyExchangeStore.exchangeRate;

      if (!exchangeRate) {
        return;
      }

      let virtualData = expense.virtualData || {};
      const filterFields = virtualData.filterFields;

      const amountHomeCurrency = updateExchangeDetails(expense, exchangeRate);

      virtualData = {
        ...virtualData,
        filterFields,
        amountHomeCurrency,
      };

      expense = {
        ...expense,
        virtualData,
      };
    },
    reset() {
      expense = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseStore = createExpenseStore();
