import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '../../db';
import {
  type CurrencyExchangeRateResponseFrankfurter,
  type HistoricalCurrencyExchangeRate,
  type HistoricalCurrencyExchangeRateEntry,
} from '../types';
import { createDate } from '$lib/helpers/date-time/createDate';
import { findNearestExchangeRate } from '$lib/helpers/find-nearest-exchange-rate';
import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
import type { Dayjs } from 'dayjs';

async function fetchExchangeRates(
  startDate: string,
  endDate: string,
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
) {
  const group = 'week';

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates/?from=${startDate}&to=${endDate}&base=${tripCurrency}&quotes=${homeCurrency}&group=${group}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rate: ${response.status}`);
  }

  const data: CurrencyExchangeRateResponseFrankfurter[] = await response.json();

  return data;
}

function isCovered(expenseDate: Dayjs, nearest?: HistoricalCurrencyExchangeRateEntry) {
  if (!nearest) return false;

  const diff = expenseDate.diff(nearest.date, 'day');

  return diff >= 0 && diff <= 12;
}

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
        if (tripCurrency === homeCurrency) {
          exchangeRate = undefined;

          return;
        }

        fetching = true;

        const expensesData = [...useExpenseListStore.expenses].sort((a, b) =>
          a.date.localeCompare(b.date),
        );

        if (!expensesData.length) {
          exchangeRate = undefined;

          return;
        }

        const target =
          exchangeRate ??
          (await db.historicalCurrencyExchangeRates
            .where('[homeCurrency+tripCurrency]')
            .equals([homeCurrency, tripCurrency])
            .first());

        exchangeRate = target;

        const firstExpenseEntry = expensesData[0];
        const lastExpenseEntry = expensesData[expensesData.length - 1];
        const expenseStartDate = createDate(firstExpenseEntry.date);
        const expenseEndDate = createDate(lastExpenseEntry.date);

        if (target) {
          const nearestStart = findNearestExchangeRate(
            expenseStartDate.format('YYYY-MM-DD'),
            target,
          );

          const nearestEnd = findNearestExchangeRate(expenseEndDate.format('YYYY-MM-DD'), target);

          if (isCovered(expenseStartDate, nearestStart) && isCovered(expenseEndDate, nearestEnd)) {
            console.log('debug: range already present, no update needed', target);
            return;
          }
        }

        // Considering the data for the whole month
        const startDate = expenseStartDate.subtract(2, 'day').startOf('month').format('YYYY-MM-DD');
        const endDate = expenseEndDate.add(2, 'day').endOf('month').format('YYYY-MM-DD');

        const data: CurrencyExchangeRateResponseFrankfurter[] = await fetchExchangeRates(
          startDate,
          endDate,
          tripCurrency,
          homeCurrency,
        );

        const newExchangeRate: HistoricalCurrencyExchangeRate = {
          homeCurrency,
          tripCurrency,
          data: data.map<HistoricalCurrencyExchangeRateEntry>((item) => ({
            date: item.date,
            exchangeRate: item.rate || 0,
          })),
          requestedAt: Date.now(),
        };

        console.log('debug: fetch', newExchangeRate);

        if (target) {
          await db.historicalCurrencyExchangeRates
            .where('[homeCurrency+tripCurrency]')
            .equals([homeCurrency, tripCurrency])
            .modify(newExchangeRate);
        } else {
          await db.historicalCurrencyExchangeRates.add(newExchangeRate);
        }

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
