import { type CurrencyCode } from '@flightlesslabs/currency';

export type DateExchangeRate = {
  date: string;
  exchangeRate: number;
};

export type CurrencyExchangeRate = {
  id?: number;
  homeCurrency: CurrencyCode;
  tripCurrency: CurrencyCode;
  data: DateExchangeRate[];
  requestedAt: number;
};

export type CurrencyExchangeRateResponseFrankfurter = {
  date: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  rate?: number;
};

export type ExchangeDateGrouping = 'week' | 'month';
