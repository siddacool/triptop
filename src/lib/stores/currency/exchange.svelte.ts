import type { CurrencyCode } from '@flightlesslabs/currency';
import { db } from '../db';
import {
  CurrencyExchangeRequestDiffrence,
  type CurrencyExchangeRate,
  type CurrencyExchangeRateResponseFrankfurter,
} from './types';
import { createDate } from '$lib/helpers/date-time/createDate';

function createCurrencyExchangeStore() {
  let exchangeRate: CurrencyExchangeRate | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get exchangeRate() {
      return exchangeRate;
    },
    get isRateOutdated() {
      if (!exchangeRate?.requestedAt) {
        return false;
      }

      const requestedAtMoment = createDate(exchangeRate.requestedAt);

      return createDate().diff(requestedAtMoment, 'hour') >= CurrencyExchangeRequestDiffrence;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        fetching = true;

        // No need to request stuff
        if (tripCurrency === homeCurrency) {
          exchangeRate = undefined;

          return;
        }

        const now = createDate();
        const target = await db.currencyExchangeRates
          .where('[homeCurrency+tripCurrency]')
          .equals([homeCurrency, tripCurrency])
          .first();

        if (target) {
          exchangeRate = target;
        } else {
          exchangeRate = undefined;
        }

        const targetRequestedAtMoment = target?.requestedAt
          ? createDate(target?.requestedAt)
          : undefined;

        // no need to further update
        if (
          targetRequestedAtMoment &&
          now.diff(targetRequestedAtMoment, 'hour') < CurrencyExchangeRequestDiffrence
        ) {
          console.log('debug: no update', target);

          return;
        }

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${tripCurrency}/${homeCurrency}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch exchange rate: ${response.status}`);
        }

        const data: CurrencyExchangeRateResponseFrankfurter = await response.json();

        const newExchangeRate: CurrencyExchangeRate = {
          homeCurrency: data.quote,
          tripCurrency: data.base,
          exchangeRate: data.rate || 0,
          date: data.date,
          requestedAt: Date.now(),
        };

        console.log('debug: fetch', newExchangeRate);

        if (target) {
          await db.currencyExchangeRates.update(target.id, newExchangeRate);
        } else {
          await db.currencyExchangeRates.add(newExchangeRate);
        }

        exchangeRate = {
          ...exchangeRate,
          ...newExchangeRate,
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
    clear() {
      exchangeRate = undefined;
    },
  };
}

export const useCurrencyExchangeStore = createCurrencyExchangeStore();
