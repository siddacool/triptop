import { currencies, type CurrencyCode } from '@flightlesslabs/currency';

export const CurrencyExchangeRequestDiffrence = 24;

export type CurrencyExchangeRate = {
  id?: number;
  homeCurrency: CurrencyCode;
  tripCurrency: CurrencyCode;
  date: string;
  exchangeRate: number;
  requestedAt: number;
};

export type HistoricalCurrencyExchangeRateEntry = {
  date: string;
  exchangeRate: number;
};

export type HistoricalCurrencyExchangeRate = {
  id?: number;
  homeCurrency: CurrencyCode;
  tripCurrency: CurrencyCode;
  startDate: string;
  endDate: string;
  data: HistoricalCurrencyExchangeRateEntry[];
};

export type CurrencyExchangeRateResponseFrankfurter = {
  date: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  rate?: number;
};

export type CurrencyOption = {
  label: string;
  value: CurrencyCode;
};

export const currencyOptions: CurrencyOption[] = currencies.map((item) =>
  Object.assign({ label: `${item.currencyCode} - ${item.country}`, value: item.currencyCode }),
);
