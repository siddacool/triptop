import { db } from '$lib/db';
import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';

export function getHistoricalExchangeRate(tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
  return db.historicalCurrencyExchangeRates
    .where('[homeCurrency+tripCurrency]')
    .equals([homeCurrency, tripCurrency])
    .first();
}

export async function updateHistoricalExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  exchangeRate: CurrencyExchangeRate,
): Promise<CurrencyExchangeRate> {
  await db.historicalCurrencyExchangeRates
    .where('[homeCurrency+tripCurrency]')
    .equals([homeCurrency, tripCurrency])
    .modify(exchangeRate);

  return exchangeRate;
}

export async function createHistoricalExchangeRate(
  exchangeRate: CurrencyExchangeRate,
): Promise<CurrencyExchangeRate> {
  await db.historicalCurrencyExchangeRates.add(exchangeRate);

  return exchangeRate;
}

// LiveExchangeRate
export function getLiveExchangeRate(tripCurrency: CurrencyCode, homeCurrency: CurrencyCode) {
  return db.liveCurrencyExchangeRates
    .where('[homeCurrency+tripCurrency]')
    .equals([homeCurrency, tripCurrency])
    .first();
}

export async function updateLiveExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  exchangeRate: CurrencyExchangeRate,
): Promise<CurrencyExchangeRate> {
  await db.liveCurrencyExchangeRates
    .where('[homeCurrency+tripCurrency]')
    .equals([homeCurrency, tripCurrency])
    .modify(exchangeRate);

  return exchangeRate;
}

export async function createLiveExchangeRate(
  exchangeRate: CurrencyExchangeRate,
): Promise<CurrencyExchangeRate> {
  await db.liveCurrencyExchangeRates.add(exchangeRate);

  return exchangeRate;
}
