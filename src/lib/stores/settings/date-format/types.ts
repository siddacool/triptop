import type { DatePickerFormat } from '@flightlesslabs/dodo-ui-date';

export type DateFormatMode = 'DD/MM/YYYY' | 'MM/DD/YYYY';

export type DateFormatOption = {
  label: string;
  value: DateFormatMode;
  valueDatePickerFormat: DatePickerFormat;
};

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
