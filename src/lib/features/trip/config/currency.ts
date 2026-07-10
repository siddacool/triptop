import { currencies } from '@flightlesslabs/currency';
import type { CurrencyOption } from '../types/currency';

export const currencyOptions: CurrencyOption[] = currencies.map((item) =>
  Object.assign({ label: `${item.currencyCode} - ${item.country}`, value: item.currencyCode }),
);
