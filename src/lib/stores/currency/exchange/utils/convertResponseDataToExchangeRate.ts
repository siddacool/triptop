import type { CurrencyCode } from '@flightlesslabs/currency';
import type {
  CurrencyExchangeRateResponseFrankfurter,
  HistoricalCurrencyExchangeRate,
  HistoricalCurrencyExchangeRateEntry,
} from '../../types';

export function convertResponseDataToExchangeRate(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  responseData: CurrencyExchangeRateResponseFrankfurter[],
) {
  const exchangeRate: HistoricalCurrencyExchangeRate = {
    homeCurrency,
    tripCurrency,
    data: responseData.map<HistoricalCurrencyExchangeRateEntry>((item) => ({
      date: item.date,
      exchangeRate: item.rate || 0,
    })),
    requestedAt: Date.now(),
  };

  return exchangeRate;
}
