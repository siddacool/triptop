import type { CurrencyCode } from '@flightlesslabs/currency';
import type {
  CurrencyExchangeRate,
  CurrencyExchangeRateResponseFrankfurter,
  ExchangeDateGrouping,
} from '../types';
import { convertResponseDataToExchangeRate } from '../utils/convertResponseDataToExchangeRate';

export async function fetchHistoricalExchangeRatesFrankfurter(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  startDate: string,
  endDate: string,
  group: ExchangeDateGrouping = 'week',
): Promise<CurrencyExchangeRateResponseFrankfurter[]> {
  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates/?from=${startDate}&to=${endDate}&base=${tripCurrency}&quotes=${homeCurrency}&group=${group}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rate: ${response.status}`);
  }

  const responseData: CurrencyExchangeRateResponseFrankfurter[] = await response.json();

  return responseData;
}

export async function fetchHistoricalExchangeRates(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  startDate: string,
  endDate: string,
  group?: ExchangeDateGrouping,
): Promise<CurrencyExchangeRate | null> {
  try {
    const responseData = await fetchHistoricalExchangeRatesFrankfurter(
      tripCurrency,
      homeCurrency,
      startDate,
      endDate,
      group,
    );

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
