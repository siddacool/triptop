import { DEFAULT_LOCALE } from '../const';

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
