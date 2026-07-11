import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';
import { listTripExpenses } from '$lib/features/expense/db';
import { getHistoricalExchangeRate } from '../db';
import { createDate } from '$lib/utils/date-time/createDate';
import { createFetchDateRange } from '../utils/createFetchDateRange';
import { saveHistoricalExchangeRate } from '../logic';
import { fetchHistoricalExchangeRates } from '../api/historical-rates';
import { needsExchangeRateUpdate } from '../utils/needsExchangeRateUpdate';

function createHistoricalRatesExchangeStore() {
  let exchangeRate: CurrencyExchangeRate | undefined = $state(undefined);

  return {
    get exchangeRate() {
      return exchangeRate;
    },
    async load(tripId: string, tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        let expensesData = await listTripExpenses(tripId);

        expensesData = expensesData.sort((a, b) => a.date.localeCompare(b.date));

        if (tripCurrency === homeCurrency) {
          exchangeRate = undefined;
          return;
        }

        if (!expensesData?.length) {
          exchangeRate = undefined;
          return;
        }

        // Load cached from store or fresh data from dexie
        const target =
          exchangeRate ?? (await getHistoricalExchangeRate(tripCurrency, homeCurrency));

        exchangeRate = target;

        // Create reusable expene dates
        const expenseStartDate = createDate(expensesData[0].date);
        const expenseEndDate = createDate(expensesData[expensesData.length - 1].date);

        const isUpdateNeeded = needsExchangeRateUpdate(
          exchangeRate,
          expenseEndDate,
          expenseStartDate,
        );

        if (!isUpdateNeeded) {
          console.log('debug: range already present, no update needed', exchangeRate);
          return;
        }

        // Considering the data for the whole month
        const { startDate, endDate } = createFetchDateRange(expenseStartDate, expenseEndDate);

        // Fetch the weekly data
        const newExchangeRate = await fetchHistoricalExchangeRates(
          tripCurrency,
          homeCurrency,
          startDate,
          endDate,
        );

        if (!newExchangeRate) {
          exchangeRate = undefined;

          return;
        }

        console.log('debug: fetch', newExchangeRate);

        await saveHistoricalExchangeRate(tripCurrency, homeCurrency, exchangeRate, newExchangeRate);

        // Update store
        exchangeRate = newExchangeRate;

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
