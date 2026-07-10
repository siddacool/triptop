import { categoryOptions } from '$lib/features/expense/config/category-options';
import { expenseListStore } from '$lib/features/expense/store/list.svelte';
import type { Expense } from '$lib/features/expense/types';
import { Category } from '$lib/features/expense/types/category';
import { settingsStore } from '$lib/features/settings/store/main.svelte';
import { createDate } from '$lib/utils/date-time/createDate';
import { downloadFile } from '$lib/utils/downloadFile';
import { toSafeFilename } from '$lib/utils/file-name/file-name';
import { tripDetailStore } from '../../store/detail.svelte';
import type { Trip } from '../../types';
import { validateTripExportExpenses } from '../../validation';

const escapeCsvValue = (value: unknown): string => {
  const str = String(value ?? '');

  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

const categoryMap = new Map(categoryOptions.map(({ value, label }) => [value, label]));

export function downloadTripAsCSV() {
  const trip = tripDetailStore.trip as Trip;
  const expenses = expenseListStore.expenses;

  validateTripExportExpenses(trip, expenses);

  const settings = settingsStore.settings;
  const dateFormat = settings.dateFormat;
  const enableCurrencyConversion = settings.enableCurrencyConversion;
  const homeCurrency = settings.homeCurrency;

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
  const filename = `triptop.${nameFormmated}.${now.format('YYYY-MM-DD_HH-mm-ss')}.csv`;

  downloadFile(filename, csv, 'text/csv');
}
