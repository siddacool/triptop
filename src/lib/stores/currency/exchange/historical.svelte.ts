import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '../../db';
import {
  type CurrencyExchangeRateResponseFrankfurter,
  type HistoricalCurrencyExchangeRate,
} from '../types';

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
        const endDate = expensesData[expensesData.length].date;

        const target = await db.historicalCurrencyExchangeRates
          .where('[homeCurrency+tripCurrency]')
          .equals([homeCurrency, tripCurrency])
          .first();

        if (target) {
          exchangeRate = target;
        } else {
          exchangeRate = undefined;
        }

        if (target?.startDate === startDate && target.endDate === endDate) {
          return;
        }

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${tripCurrency}/${homeCurrency}`,
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
