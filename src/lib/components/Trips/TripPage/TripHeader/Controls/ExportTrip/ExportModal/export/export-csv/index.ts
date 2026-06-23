import { categoryOptions } from '$lib/stores/category/data';
import { Category } from '$lib/stores/category/types';
import type { CurrencyExchangeRate } from '$lib/stores/currency/types';
import type { Expense } from '$lib/stores/expense/types';
import type { DateFormatMode } from '$lib/stores/settings/date-format/types';
import type { Trip } from '$lib/stores/trip/types';
import { convertCurrency } from '$lib/helpers/convert-currency';
import { createDate } from '@flightlesslabs/time-utils';
import type { ExportTripValue } from '../types';

export type ExportTripCsvValue = string;

const escapeCsvValue = (value: unknown): string => {
  const str = String(value ?? '');

  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

const categoryMap = new Map(categoryOptions.map(({ value, label }) => [value, label]));

export function exportTripAsCsv(
  trip: Trip,
  expenses: Expense[],
  dateFormat: DateFormatMode,
  exchangeRate?: CurrencyExchangeRate,
): ExportTripValue<string> {
  const exportedAt = createDate().format(dateFormat);

  const buildRow = (expense: Expense, includeExportedAt = false) => [
    expense.name,
    expense.amount,
    ...(exchangeRate ? [convertCurrency(expense.amount, exchangeRate.exchangeRate)] : []),
    categoryMap.get(expense.category || Category.OTHER) ?? '',
    createDate(expense.date).format(dateFormat),
    '',
    includeExportedAt ? exportedAt : '',
  ];

  const rows = [
    [
      'Name',
      'Amount',
      ...(exchangeRate ? [`Amount (${exchangeRate.homeCurrency})`] : []),
      'Category',
      'Date',
      '',
      'Exported At',
    ],
    ...expenses
      .filter((expense) => !expense.archived)
      .map((expense, index) => buildRow(expense, index === 0)),
  ];

  const csv = rows.map((row) => row.map(escapeCsvValue).join(',')).join('\n');

  return {
    data: csv,
    dataString: csv,
    filename: `triptop-export.${trip.name}.${createDate().format('YYYY-MM-DD_HH-mm-ss')}.csv`,
    type: 'text/csv',
  };
}
