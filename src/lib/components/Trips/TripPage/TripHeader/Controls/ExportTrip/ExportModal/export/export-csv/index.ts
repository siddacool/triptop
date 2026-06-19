import { categoryOptions } from '$lib/stores/category/data';
import type { Expense } from '$lib/stores/expense/types';
import { DEFAULT_LOCALE, type Trip } from '$lib/stores/trip/types';
import type { ExportTripValue } from '../types';

export type ExportTripCsvValue = string;

export function exportTripAsCsv(trip: Trip, expenses: Expense[]): ExportTripValue<string> {
  const escapeCsvValue = (value: unknown) => {
    const str = value == null ? '' : String(value);

    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const csv = [
    ['Name', 'Amount', 'Category', 'Date'].join(','),
    ...expenses
      .filter((expense) => !expense.archived)
      .map((expense) =>
        [
          expense.name,
          expense.amount,
          categoryOptions.find((option) => option.value === expense.category)?.label ?? '',
          new Date(expense.date).toLocaleDateString(trip.locale || DEFAULT_LOCALE),
        ]
          .map(escapeCsvValue)
          .join(','),
      ),
  ].join('\n');

  return {
    data: csv,
    dataString: csv,
    filename: `triptop-export.${trip.name}.csv`,
    type: 'text/csv',
  };
}
