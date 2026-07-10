import type { CurrencyCode } from '@flightlesslabs/currency';
import type { DatePickerFormat } from '@flightlesslabs/dodo-ui-date';

export type DateFormatMode = 'DD/MM/YYYY' | 'MM/DD/YYYY';

export type DateFormatOption = {
  label: string;
  value: DateFormatMode;
  valueDatePickerFormat: DatePickerFormat;
};

export type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemeOption = {
  value: ThemeMode;
  label: string;
};

export const enum ThemeAppBarColors {
  LIGHT = '#ddd6ff',
  DARK = '#1a162f', // #0f0324
}

export type SettingsConfig = {
  theme: ThemeMode;
  dateFormat: DateFormatMode;
  locale: string;
  homeCurrency: CurrencyCode;
  enableCurrencyConversion: boolean;
};
