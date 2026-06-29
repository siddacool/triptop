import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '../../db';
import {
  type CurrencyExchangeRateResponseFrankfurter,
  type HistoricalCurrencyExchangeRate,
  type HistoricalCurrencyExchangeRateEntry,
} from '../types';
import { createDate } from '$lib/helpers/date-time/createDate';
import { findNearestExchangeRate } from '$lib/helpers/find-nearest-exchange-rate';

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

        let expensesData = await db.expense.where({ tripId: tripId }).toArray();

        expensesData = expensesData.sort((a, b) => a.date.localeCompare(b.date));

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

        const firstExpenseEntry = expensesData[0];
        const lastExpenseEntry = expensesData[expensesData.length - 1];
        const expenseStartDate = createDate(firstExpenseEntry.date);
        const expenseEndDate = createDate(lastExpenseEntry.date);

        const targetStartDate = target
          ? findNearestExchangeRate(expenseStartDate.format('YYYY-MM-DD'), target)
          : undefined;

        const targetEndDate = target
          ? findNearestExchangeRate(expenseEndDate.format('YYYY-MM-DD'), target)
          : undefined;

        const startDateDiffrence =
          targetStartDate && expenseStartDate
            ? expenseStartDate.diff(targetStartDate.date, 'day')
            : null;

        const endDateDiffrence =
          targetEndDate && expenseEndDate ? expenseEndDate.diff(targetEndDate.date, 'day') : null;

        const startDateDiffrencePass =
          startDateDiffrence !== null && startDateDiffrence >= 0 && startDateDiffrence <= 12;

        const endDateDiffrencePass =
          endDateDiffrence !== null && endDateDiffrence >= 0 && endDateDiffrence <= 12;

        if (startDateDiffrencePass && endDateDiffrencePass) {
          console.log('debug: range already present, no update needed', target);
          return;
        }

        // Considering the data for the whole month
        const startDate = expenseStartDate.subtract(2, 'day').startOf('month').format('YYYY-MM-DD');
        const endDate = expenseEndDate.add(2, 'day').endOf('month').format('YYYY-MM-DD');

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
