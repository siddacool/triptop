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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sanitizedExpenses = expenses.map(({ searchFields, ...expense }) => expense);

  const data: ExportTripJsonValue = {
    trip,
    expenses: sanitizedExpenses,
  };

  return {
    data,
    dataString: JSON.stringify(data, null, 2),
    filename: `triptop-export.${trip.name}.json`,
    type: 'application/json',
  };
}
