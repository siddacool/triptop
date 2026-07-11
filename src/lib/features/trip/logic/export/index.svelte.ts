import { expenseListStore } from '$lib/features/expense/store/list.svelte';
import type { Expense } from '$lib/features/expense/types';
import { createDate } from '$lib/utils/date-time/createDate';
import { downloadFile } from '$lib/utils/downloadFile';
import { toSafeFilename } from '$lib/utils/file-name/file-name';
import { tripDetailStore } from '../../store/detail.svelte';
import type { Trip } from '../../types';
import type { ExportTripData } from '../../types/export';
import { validateTripExportExpenses } from '../../validation';

export function exportTrip() {
  const trip = tripDetailStore.trip as Trip;
  const expenses = expenseListStore.expenses;

  validateTripExportExpenses(trip, expenses);

  const expensesCleaned: Expense[] = [];

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { deviceOnlyData, ...restTripProps } = trip;

  for (let i = 0; i < expenses.length; i++) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { id, virtualData, ...restProps } = expenses[i];

    expensesCleaned.push({ ...restProps });
  }

  const data: ExportTripData = {
    trip: { ...restTripProps },
    expenses: expensesCleaned,
  };

  const now = createDate();

  const nameFormmated = toSafeFilename(trip.name, 20);
  const filename = `${nameFormmated}.${now.format('YYYY-MM-DD_HH-mm-ss')}.triptop`;

  downloadFile(filename, JSON.stringify(data, null, 2), 'application/vnd.triptop');
}
