import type { CurrencyCode } from '@flightlesslabs/currency';

export const DEFAULT_LOCALE = navigator.languages.includes('en-IN') ? 'en-IN' : 'en-US';

const locales = navigator.languages || [DEFAULT_LOCALE];

export const localeOptionAuto = {
  value: 'auto',
  label: 'Auto',
};

export const localeOptionsBrowser = locales.map((locale) => ({
  value: locale,
  label: locale,
}));

export const localeOptions = [localeOptionAuto, ...localeOptionsBrowser];

export interface TripDeviceOnlyData {
  enableCurrencyConversion?: boolean;
}

export interface Trip {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyCode;
  archived?: boolean;
  locale?: string;
  deviceOnlyData?: TripDeviceOnlyData;
}

export interface EditTripFormData {
  name: string;
  currency: CurrencyCode;
  locale?: string;
}
