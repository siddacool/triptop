import type { CurrencyCode } from '@flightlesslabs/currency';
import { createHistoricalExchangeRate, updateHistoricalExchangeRate } from '../db';
import type { CurrencyExchangeRate } from '../types';

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
