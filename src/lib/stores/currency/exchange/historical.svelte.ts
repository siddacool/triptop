import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '../../db';
import {
  type CurrencyExchangeRateResponseFrankfurter,
  type HistoricalCurrencyExchangeRate,
} from '../types';
import type { Expense } from '$lib/stores/expense/types';

function checkIfUpdateNeeded(
  expenses: Expense[],
  oldExchangeRate: HistoricalCurrencyExchangeRate | undefined,
) {
  if (!oldExchangeRate) {
    return true;
  }

  if (!oldExchangeRate.startDate || !oldExchangeRate.endDate) {
    return true;
  }

  const startDate = expenses[0].date;
  const endDate = expenses[expenses.length - 1].date;

  if (oldExchangeRate.startDate <= startDate && oldExchangeRate.endDate >= endDate) {
    return false;
  }

  return true;
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
        fetching = true;

        // No need to request stuff
        if (tripCurrency === homeCurrency) {
          exchangeRate = undefined;

          return;
        }

        let expensesData = await db.expense.where({ tripId: tripId }).toArray();

        if (!expensesData.length) {
          exchangeRate = undefined;

          return;
        }

        expensesData = expensesData.sort((a, b) => a.date.localeCompare(b.date));

        const startDate = expensesData[0].date;
        const endDate = expensesData[expensesData.length - 1].date;

        const target = await db.historicalCurrencyExchangeRates
          .where('[homeCurrency+tripCurrency]')
          .equals([homeCurrency, tripCurrency])
          .first();

        if (target) {
          exchangeRate = target;
        } else {
          exchangeRate = undefined;
        }

        const isUpdateNeeded = checkIfUpdateNeeded(expensesData, target);

        if (!isUpdateNeeded) {
          console.log('debug: range already present, no update needed', target);
          return;
        }

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates/?from=${startDate}&to=${endDate}&base=${tripCurrency}&quotes=${homeCurrency}&group=month`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch exchange rate: ${response.status}`);
        }

        const data: CurrencyExchangeRateResponseFrankfurter[] = await response.json();

        const newExchangeRate: HistoricalCurrencyExchangeRate = {
          homeCurrency,
          tripCurrency,
          startDate,
          endDate,
          data: data.map((item) => Object.assign({ date: item.date, exchangeRate: item.rate })),
        };

        console.log('debug: fetch', newExchangeRate);

        if (target) {
          await db.historicalCurrencyExchangeRates.update(target.id, newExchangeRate);
        } else {
          await db.historicalCurrencyExchangeRates.add(newExchangeRate);
        }

        exchangeRate = {
          ...exchangeRate,
          ...newExchangeRate,
          data: [...newExchangeRate.data],
        };

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
