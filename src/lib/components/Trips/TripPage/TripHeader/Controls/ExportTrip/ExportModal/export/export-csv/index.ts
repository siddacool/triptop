import type { Expense } from '$lib/stores/expense/types';
import { DEFAULT_LOCALE, type Trip } from '$lib/stores/trip/types';
import type { ExportTripValue } from '../types';

export type ExportTripCsvValue = string;

export function exportTripAsCsv(
  trip: Trip,
  expenses: Expense[],
): ExportTripValue<ExportTripCsvValue> {
  const headers = ['Name', 'Amount', 'Category', 'Date', 'Payment Mode'];

  const escapeCsvValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return '';
    }

    const stringValue = String(value);

    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  const rows = expenses.map((expense) => [
    expense.name,
    expense.amount,
    new Date(expense.date).toLocaleDateString(trip.locale || DEFAULT_LOCALE),
    expense.category ?? '',
    expense.paymentMode ?? '',
  ]);

  const csv = [headers.join(','), ...rows.map((row) => row.map(escapeCsvValue).join(','))].join(
    '\n',
  );

  return {
    data: csv,
    dataString: csv,
    filename: `triptop-export.${trip.name}.csv`,
    type: 'text/csv',
  };
}
