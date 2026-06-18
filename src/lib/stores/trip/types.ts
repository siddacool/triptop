import type { CurrencyCode } from '@flightlesslabs/currency';

export const DEFAULT_LOCALE = 'en-US';

const locales = navigator.languages || [DEFAULT_LOCALE];

export const localeOptions = locales.map((locale) => ({
  value: locale,
  label: locale,
}));

export interface Trip {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyCode;
  archived?: boolean;
  locale?: string;
}

export interface EditTripFormData {
  name: string;
  currency: CurrencyCode;
  locale: string;
}
