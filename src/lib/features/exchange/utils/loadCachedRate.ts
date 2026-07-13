import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';
import { getHistoricalExchangeRate } from '../db';

export async function loadCachedRate(
  exchangeRate: CurrencyExchangeRate | undefined,
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
) {
  return exchangeRate ?? (await getHistoricalExchangeRate(tripCurrency, homeCurrency));
}
