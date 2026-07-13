import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';
import { listTripExpensesPure } from '$lib/features/expense/db';
import { createFetchDateRange } from '../utils/createFetchDateRange';
import { saveHistoricalExchangeRate } from '../logic';
import { fetchHistoricalExchangeRates } from '../api/historical-rates';
import { needsExchangeRateUpdate } from '../utils/needsExchangeRateUpdate';
import { shouldSkip } from '../utils/shouldSkip';
import { loadCachedRate } from '../utils/loadCachedRate';
import { getExpenseDateRange } from '../utils/getExpenseDateRange';

function createHistoricalRatesExchangeStore() {
  let exchangeRate: CurrencyExchangeRate | undefined = $state(undefined);

  return {
    get exchangeRate() {
      return exchangeRate;
    },
    async load(tripId: string, tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        let expensesData = await listTripExpensesPure(tripId);

        expensesData = expensesData.sort((a, b) => a.date.localeCompare(b.date));

        if (shouldSkip(expensesData, tripCurrency, homeCurrency)) {
          exchangeRate = undefined;
          return;
        }

        exchangeRate = await loadCachedRate(exchangeRate, tripCurrency, homeCurrency);

        const { start, end } = getExpenseDateRange(expensesData);

        if (!needsExchangeRateUpdate(exchangeRate, end, start)) {
          return;
        }

        const { startDate, endDate } = createFetchDateRange(start, end);

        const latestRate = await fetchHistoricalExchangeRates(
          tripCurrency,
          homeCurrency,
          startDate,
          endDate,
        );

        if (!latestRate) {
          exchangeRate = undefined;

          return;
        }

        await saveHistoricalExchangeRate(tripCurrency, homeCurrency, exchangeRate, latestRate);

        exchangeRate = latestRate;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.resolve();
      }
    },
    clear() {
      exchangeRate = undefined;
    },
  };
}

export const historicalRatesExchangeStore = createHistoricalRatesExchangeStore();
