import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRateResponseFrankfurter } from '../../types';

export async function fetchExchangeRates(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  startDate: string,
  endDate: string,
  group: 'week' | 'month' = 'week',
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
