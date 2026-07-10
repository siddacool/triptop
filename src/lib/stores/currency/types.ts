import { type CurrencyCode } from '@flightlesslabs/currency';

export type HistoricalCurrencyExchangeRateEntry = {
  date: string;
  exchangeRate: number;
};

export type HistoricalCurrencyExchangeRate = {
  id?: number;
  homeCurrency: CurrencyCode;
  tripCurrency: CurrencyCode;
  data: HistoricalCurrencyExchangeRateEntry[];
  requestedAt: number;
};

export type CurrencyExchangeRateResponseFrankfurter = {
  date: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  rate?: number;
};
