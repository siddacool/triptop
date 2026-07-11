import type { DateFormatOption, ThemeOption } from '../types';

export const dateFormatOptions: DateFormatOption[] = [
  {
    value: 'DD/MM/YYYY',
    label: 'DD/MM/YYYY',
    valueDatePickerFormat: 'dd/mm/yyyy',
  },
  {
    value: 'MM/DD/YYYY',
    label: 'MM/DD/YYYY',
    valueDatePickerFormat: 'mm/dd/yyyy',
  },
];

export const themeOptions: ThemeOption[] = [
  {
    value: 'auto',
    label: 'Auto',
  },
  {
    value: 'light',
    label: 'Light',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
];
