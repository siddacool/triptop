import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';
import { saveLiveExchangeRate } from '../logic';
import { getLiveExchangeRate } from '../db';
import { fetchLiveExchangeRate } from '../api/live-rates';
import { needsLiveExchangeRateUpdate } from '../utils/needsLiveExchangeRateUpdate';
import { checkIfLiveRateStale } from '../utils/checkIfLiveRateStale';

function createLiveRatesExchangeStore() {
  let exchangeRate = $state<CurrencyExchangeRate | undefined>(undefined);
  const isRateStale = $derived(checkIfLiveRateStale(exchangeRate));

  return {
    get exchangeRate() {
      return exchangeRate;
    },
    get isRateStale() {
      return isRateStale;
    },
    async load(tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        if (tripCurrency === homeCurrency) {
          exchangeRate = undefined;
          return;
        }

        if (
          !exchangeRate ||
          exchangeRate?.homeCurrency !== homeCurrency ||
          exchangeRate?.tripCurrency !== tripCurrency
        ) {
          const dbData = await getLiveExchangeRate(tripCurrency, homeCurrency);

          if (dbData) {
            exchangeRate = dbData;
          }
        }

        if (!needsLiveExchangeRateUpdate(exchangeRate)) {
          return;
        }

        const latestRate = await fetchLiveExchangeRate(tripCurrency, homeCurrency);

        if (!latestRate) {
          if (
            !exchangeRate ||
            exchangeRate?.homeCurrency !== homeCurrency ||
            exchangeRate?.tripCurrency !== tripCurrency
          ) {
            exchangeRate = undefined;
          }

          return;
        }

        await saveLiveExchangeRate(tripCurrency, homeCurrency, exchangeRate, latestRate);

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

export const liveRatesExchangeStore = createLiveRatesExchangeStore();
