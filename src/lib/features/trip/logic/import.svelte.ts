import { saveTrip } from './crud.svelte';
import { addExpenseByTripId } from '$lib/features/expense/logic/crud.svelte';
import type { ExportTripData } from '../types/export';

export async function importTrip(data: ExportTripData) {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { _id, id, deviceOnlyData, ...restProps } = data.trip;

  const tripId = await saveTrip({ ...restProps });

  await addExpenseByTripId(tripId, data.expenses);
}
