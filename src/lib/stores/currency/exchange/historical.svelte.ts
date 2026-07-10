import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '$lib/db';
import { type HistoricalCurrencyExchangeRate } from '../types';
import { validateFetchConditions } from './utils/validateFetchConditions';
import { needsExchangeRateUpdate } from './utils/needsExchangeRateUpdate';
import { fetchExchangeRates } from './utils/fetchExchangeRates';
import { createFetchDateRange } from './utils/createFetchDateRange';
import { convertResponseDataToExchangeRate } from './utils/convertResponseDataToExchangeRate';
import { listTripExpenses } from '$lib/features/expense/db';
import { createDate } from '$lib/utils/date-time/createDate';

function createHistoricalCurrencyExchangeStore() {
  let exchangeRate: HistoricalCurrencyExchangeRate | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get exchangeRate() {
      return exchangeRate;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripId: string, tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        fetching = true;

        let expensesData = await listTripExpenses(tripId);

        expensesData = expensesData.sort((a, b) => a.date.localeCompare(b.date));

        // Conditions check before going further
        if (!validateFetchConditions(tripCurrency, homeCurrency, expensesData)) {
          exchangeRate = undefined;

          return;
        }

        // Load cached from store or fresh data from dexie
        const target =
          exchangeRate ??
          (await db.historicalCurrencyExchangeRates
            .where('[homeCurrency+tripCurrency]')
            .equals([homeCurrency, tripCurrency])
            .first());

        exchangeRate = target;

        // Create reusable expene dates
        const expenseStartDate = createDate(expensesData[0].date);
        const expenseEndDate = createDate(expensesData[expensesData.length - 1].date);

        // Match date range with cache and see if update from api is needed
        const isUpdateNeeded = needsExchangeRateUpdate(
          exchangeRate,
          expenseStartDate,
          expenseEndDate,
        );

        if (!isUpdateNeeded) {
          console.log('debug: range already present, no update needed', exchangeRate);
          return;
        }

        // Considering the data for the whole month
        const { startDate, endDate } = createFetchDateRange(expenseStartDate, expenseEndDate);

        // Fetch the weekly data
        const responseData = await fetchExchangeRates(
          tripCurrency,
          homeCurrency,
          startDate,
          endDate,
        );

        // Get formatted exchange rate
        const newExchangeRate = convertResponseDataToExchangeRate(
          tripCurrency,
          homeCurrency,
          responseData,
        );

        console.log('debug: fetch', newExchangeRate);

        // Commit to DB
        if (exchangeRate) {
          await db.historicalCurrencyExchangeRates
            .where('[homeCurrency+tripCurrency]')
            .equals([homeCurrency, tripCurrency])
            .modify(newExchangeRate);
        } else {
          await db.historicalCurrencyExchangeRates.add(newExchangeRate);
        }

        // Update store
        exchangeRate = newExchangeRate;

        mounted = true;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async fetchSilent(tripId: string, tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        await this.fetch(tripId, tripCurrency, homeCurrency);
      } catch (e) {
        console.error(e);
      }

      return exchangeRate;
    },
    clear() {
      exchangeRate = undefined;
    },
  };
}

export const useHistoricalCurrencyExchangeStore = createHistoricalCurrencyExchangeStore();
