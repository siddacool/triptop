import { currencies, type CurrencyCode } from '@flightlesslabs/currency';

export type CurrencyOption = {
  label: string;
  value: CurrencyCode;
};

export const currencyOptions: CurrencyOption[] = currencies.map((item) =>
  Object.assign({ label: `${item.currencyCode} - ${item.country}`, value: item.currencyCode }),
);
