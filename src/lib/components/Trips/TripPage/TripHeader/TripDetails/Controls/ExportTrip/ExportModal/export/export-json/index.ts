import { toSafeFilename } from '$lib/helpers/file-name';
import type { Expense } from '$lib/stores/expense/types';
import type { Trip } from '$lib/stores/trip/types';
import { createDate } from '$lib/helpers/date-time/createDate';
import type { ExportTripValue } from '../types';

export type ExportTripJsonValue = {
  trip: Trip;
  expenses: Expense[];
};

export function exportTripAsJson(
  trip: Trip,
  expenses: Expense[],
): ExportTripValue<ExportTripJsonValue> {
  const now = createDate();
  const expensesCleaned: Expense[] = [];

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { deviceOnlyData, ...restTripProps } = trip;

  for (let i = 0; i < expenses.length; i++) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { id, virtualData, ...restProps } = expenses[i];

    expensesCleaned.push({ ...restProps });
  }

  const data: ExportTripJsonValue = {
    trip: { ...restTripProps },
    expenses: expensesCleaned,
  };

  const nameFormmated = toSafeFilename(trip.name, 20);
  const filename = `${nameFormmated}.${now.format('YYYY-MM-DD_HH-mm-ss')}.triptop`;

  return {
    data,
    dataString: JSON.stringify(data, null, 2),
    filename,
    type: 'application/vnd.triptop',
  };
}
