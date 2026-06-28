import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '../../db';
import {
  type CurrencyExchangeRateResponseFrankfurter,
  type HistoricalCurrencyExchangeRate,
  type HistoricalCurrencyExchangeRateEntry,
} from '../types';
import { createDate } from '$lib/helpers/date-time/createDate';
import Dexie from 'dexie';
import type { Dayjs } from 'dayjs';

function checkIfUpdateNeeded(
  firstExpense: Dayjs,
  lastExpense: Dayjs,
  oldExchangeRate: HistoricalCurrencyExchangeRate | undefined,
) {
  if (!oldExchangeRate) {
    return true;
  }

  if (!oldExchangeRate.data.length) {
    return true;
  }

  const startDate = firstExpense.subtract(14, 'day').format('YYYY-MM-DD');
  const endDate = lastExpense.subtract(14, 'day').format('YYYY-MM-DD');

  const oldExchangeRateStartDate = oldExchangeRate.data[0].date;
  const oldExchangeRateEndDate = oldExchangeRate.data[oldExchangeRate.data.length - 1].date;

  if (oldExchangeRateStartDate > startDate) {
    return true;
  }

  if (oldExchangeRateEndDate < endDate) {
    return true;
  }

  return false;
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

        // No need to request stuff

        const expensesData = await db.expense
          .where('[tripId+date]')
          .between([tripId, Dexie.minKey], [tripId, Dexie.maxKey])
          .toArray();

        if (!expensesData.length) {
          exchangeRate = undefined;

          return;
        }

        const target = await db.historicalCurrencyExchangeRates
          .where('[homeCurrency+tripCurrency]')
          .equals([homeCurrency, tripCurrency])
          .first();

        if (target) {
          exchangeRate = target;
        } else {
          exchangeRate = undefined;
        }

        const firstExpense = createDate(expensesData[0].date);
        const lastExpense = createDate(expensesData.at(-1)!.date);

        const isUpdateNeeded = checkIfUpdateNeeded(firstExpense, lastExpense, target);

        if (!isUpdateNeeded) {
          console.log('debug: range already present, no update needed', target);
          return;
        }

        // Considering the data for the whole month
        const startDate = firstExpense.subtract(1, 'day').startOf('month').format('YYYY-MM-DD');
        const endDate = lastExpense.subtract(1, 'day').endOf('month').format('YYYY-MM-DD');

        const group = 'week';

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates/?from=${startDate}&to=${endDate}&base=${tripCurrency}&quotes=${homeCurrency}&group=${group}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch exchange rate: ${response.status}`);
        }

        const data: CurrencyExchangeRateResponseFrankfurter[] = await response.json();

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
          await db.historicalCurrencyExchangeRates.update(target.id, newExchangeRate);
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
