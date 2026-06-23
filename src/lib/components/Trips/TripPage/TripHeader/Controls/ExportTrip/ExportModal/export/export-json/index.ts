import type { Expense } from '$lib/stores/expense/types';
import type { Trip } from '$lib/stores/trip/types';
import type { ExportTripValue } from '../types';

export type ExportTripJsonValue = {
  trip: Trip;
  expenses: Expense[];
};

export function exportTripAsJson(
  trip: Trip,
  expenses: Expense[],
): ExportTripValue<ExportTripJsonValue> {
  const expensesCleaned: Expense[] = [];

  for (let i = 0; i < expenses.length; i++) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { id, filterFields, ...restProps } = expenses[i];

    expensesCleaned.push({ ...restProps });
  }

  const data: ExportTripJsonValue = {
    trip,
    expenses: expensesCleaned,
  };

  return {
    data,
    dataString: JSON.stringify(data, null, 2),
    filename: `triptop-export.${trip.name}.json`,
    type: 'application/json',
  };
}
