import { saveTrip } from './crud.svelte';
import { addExpenseByTripId } from '$lib/features/expense/logic/crud.svelte';
import type { ExportTripData } from '../types/export';
import { validateTripImport } from '../validation';
import { tripListStore } from '../store/list.svelte';

export async function importTrip(data: ExportTripData) {
  validateTripImport(data);

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { _id, id, ...restProps } = data.trip;

  const tripId = await saveTrip({ ...restProps });

  await addExpenseByTripId(tripId, data.expenses);

  await tripListStore.load();
}
