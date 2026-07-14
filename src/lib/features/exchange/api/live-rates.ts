import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate, CurrencyExchangeRateResponseFrankfurter } from '../types';
import { convertResponseDataToExchangeRate } from '../utils/convertResponseDataToExchangeRate';

export async function fetchLiveExchangeRateFrankfurter(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
): Promise<CurrencyExchangeRateResponseFrankfurter[]> {
  const response = await fetch(
    `https://api.frankfurter.dev/v2/rate/${tripCurrency}/${homeCurrency}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rate: ${response.status}`);
  }

  const responseData: CurrencyExchangeRateResponseFrankfurter = await response.json();

  return [responseData];
}

export async function fetchLiveExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
): Promise<CurrencyExchangeRate | null> {
  try {
    const responseData = await fetchLiveExchangeRateFrankfurter(tripCurrency, homeCurrency);

    if (!responseData) {
      throw new Error(`No data`);
    }

    const newExchangeRate = convertResponseDataToExchangeRate(
      tripCurrency,
      homeCurrency,
      responseData,
    );

    return Promise.resolve(newExchangeRate);
  } catch (e) {
    console.log('debug:', e);

    return Promise.resolve(null);
  }
}
