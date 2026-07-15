import type { CurrencyCode } from '@flightlesslabs/currency';
import {
  createHistoricalExchangeRate,
  createLiveExchangeRate,
  deleteBulkHistoricalExchangeRates,
  deleteBulkLiveExchangeRates,
  listHistoricalExchangeRates,
  listLiveExchangeRates,
  updateHistoricalExchangeRate,
  updateLiveExchangeRate,
} from '../db';
import type { CurrencyExchangeRate } from '../types';
import { listTrips } from '$lib/features/trip/db';
import { settingsStore } from '$lib/features/settings/store/main.svelte';
import { getCleanupCandidates } from '../utils/get-cleanup-candidates';

/**
 * Persists a historical exchange rate.
 *
 * Updates the existing record if one already exists; otherwise creates a new one.
 *
 * @param tripCurrency The trip currency.
 * @param homeCurrency The home currency.
 * @param oldExchangeRate The existing exchange rate, if any.
 * @param newExchangeRate The exchange rate to save.
 * @returns The persisted exchange rate.
 */
export function saveHistoricalExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  oldExchangeRate: CurrencyExchangeRate | undefined,
  newExchangeRate: CurrencyExchangeRate,
): Promise<CurrencyExchangeRate> {
  if (oldExchangeRate) {
    return updateHistoricalExchangeRate(tripCurrency, homeCurrency, newExchangeRate);
  }

  return createHistoricalExchangeRate(newExchangeRate);
}

// LiveExchangeRate
/**
 * Persists a live exchange rate.
 *
 * Updates the existing record if one already exists; otherwise creates a new one.
 *
 * @param tripCurrency The trip currency.
 * @param homeCurrency The home currency.
 * @param oldExchangeRate The existing exchange rate, if any.
 * @param newExchangeRate The exchange rate to save.
 * @returns The persisted exchange rate.
 */
export function saveLiveExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  oldExchangeRate: CurrencyExchangeRate | undefined,
  newExchangeRate: CurrencyExchangeRate,
): Promise<CurrencyExchangeRate> {
  if (oldExchangeRate) {
    return updateLiveExchangeRate(tripCurrency, homeCurrency, newExchangeRate);
  }

  return createLiveExchangeRate(newExchangeRate);
}

export async function exchangeRatesCleanup() {
  const trips = await listTrips();
  const historicalExchangeRates = await listHistoricalExchangeRates();
  const liveExchangeRates = await listLiveExchangeRates();
  const homeCurrency = settingsStore.settings.homeCurrency;
  const currencies: CurrencyCode[] = [...new Set(trips.map((t) => t.currency))];
  const historicalExchangeRateIds = getCleanupCandidates(
    homeCurrency,
    currencies,
    historicalExchangeRates,
  );
  const liveExchangeRateIds = getCleanupCandidates(homeCurrency, currencies, liveExchangeRates);

  if (historicalExchangeRateIds.length) {
    deleteBulkHistoricalExchangeRates(historicalExchangeRateIds);
  }

  if (liveExchangeRateIds.length) {
    deleteBulkLiveExchangeRates(liveExchangeRateIds);
  }

  return currencies;
}
