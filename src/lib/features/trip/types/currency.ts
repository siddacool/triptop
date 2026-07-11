import { type CurrencyCode } from '@flightlesslabs/currency';

export type MoneyValue = {
  amount: number;
  amountHomeCurrency: number;
};

export type CurrencyOption = {
  label: string;
  value: CurrencyCode;
};
