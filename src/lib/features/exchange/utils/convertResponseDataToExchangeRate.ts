import type { CurrencyCode } from '@flightlesslabs/currency';
import type {
  CurrencyExchangeRate,
  CurrencyExchangeRateResponseFrankfurter,
  DateExchangeRate,
} from '../types';

export function convertResponseDataToExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  responseData: CurrencyExchangeRateResponseFrankfurter[],
) {
  const exchangeRate: CurrencyExchangeRate = {
    homeCurrency,
    tripCurrency,
    data: responseData.map<DateExchangeRate>((item) => ({
      date: item.date,
      exchangeRate: item.rate || 0,
    })),
    requestedAt: Date.now(),
  };

  return exchangeRate;
}
