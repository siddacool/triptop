import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';
import { getExpenseById } from '../db';
import type { Expense } from '../types';
import { updateExchangeDetails } from '../utils/decorators/update-exchange-details';

function createExpenseDeatilStore() {
  let expense = $state<Expense | undefined>(undefined);

  return {
    get expense() {
      return expense;
    },
    async load(id: string) {
      const generalExpense = await getExpenseById(id);
      const exchangeRate = historicalRatesExchangeStore.exchangeRate;

      const amountHomeCurrency = updateExchangeDetails(generalExpense, exchangeRate);

      generalExpense.virtualData = {
        amountHomeCurrency,
      };

      expense = generalExpense;
    },
  };
}

export const expenseDeatilStore = createExpenseDeatilStore();
