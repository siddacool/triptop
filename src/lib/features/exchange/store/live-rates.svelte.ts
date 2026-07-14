import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';
import { saveLiveExchangeRate } from '../logic';
import { getLiveExchangeRate } from '../db';
import { fetchLiveExchangeRate } from '../api/live-rates';
import { needsLiveExchangeRateUpdate } from '../utils/needsLiveExchangeRateUpdate';

function createLiveRatesExchangeStore() {
  let exchangeRate: CurrencyExchangeRate | undefined = $state(undefined);

  return {
    get exchangeRate() {
      return exchangeRate;
    },
    async load(tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
      try {
        if (tripCurrency === homeCurrency) {
          exchangeRate = undefined;
          return;
        }

        exchangeRate = exchangeRate ?? (await getLiveExchangeRate(tripCurrency, homeCurrency));

        if (!needsLiveExchangeRateUpdate(exchangeRate)) {
          return;
        }

        const latestRate = await fetchLiveExchangeRate(tripCurrency, homeCurrency);

        if (!latestRate) {
          exchangeRate = undefined;

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
