import { categoryOptions } from '$lib/stores/category/data';
import { Category } from '$lib/stores/category/types';
import type { Expense } from '$lib/stores/expense/types';
import type { DateFormatMode } from '$lib/stores/settings/date-format/types';
import type { Trip } from '$lib/stores/trip/types';
import { createDate } from '$lib/helpers/date-time/createDate';
import type { ExportTripValue } from '../types';
import { toSafeFilename } from '$lib/helpers/file-name';
import type { CurrencyCode } from '@flightlesslabs/currency';

const escapeCsvValue = (value: unknown): string => {
  const str = String(value ?? '');

  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

const categoryMap = new Map(categoryOptions.map(({ value, label }) => [value, label]));

export function exportTripAsCsv(
  trip: Trip,
  expenses: Expense[],
  dateFormat: DateFormatMode,
  enableCurrencyConversion: boolean,
  homeCurrency: CurrencyCode,
): ExportTripValue<string> {
  const now = createDate();
  const exportedAt = now.format(dateFormat);

  const buildRow = (expense: Expense, includeExportedAt = false) => [
    expense.name,
    expense.amount,
    ...(enableCurrencyConversion && expense?.virtualData?.amountHomeCurrency
      ? [expense?.virtualData?.amountHomeCurrency]
      : []),
    categoryMap.get(expense.category || Category.OTHER) ?? '',
    createDate(expense.date).format(dateFormat),
    '',
    includeExportedAt ? exportedAt : '',
  ];

  const rows = [
    [
      'Name',
      'Amount',
      ...(enableCurrencyConversion ? [`Amount (${homeCurrency})`] : []),
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

  const nameFormmated = toSafeFilename(trip.name, 20);
  const filename = `triptop-export.${nameFormmated}.${now.format('YYYY-MM-DD_HH-mm-ss')}.csv`;

  return {
    data: csv,
    dataString: csv,
    filename,
    type: 'text/csv',
  };
}
