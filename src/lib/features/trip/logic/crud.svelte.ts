import { deleteExpenseByTripId } from '$lib/features/expense/logic/crud.svelte';
import { createTrip, updateTrip, deleteTrip as deleteTripDb, getTripById } from '../db';
import type { TripCreateData, TripUpdateData } from '../types';
import { validateTripCreate, validateTripUpdate } from '../validation';

export async function saveTrip(data: TripCreateData | TripUpdateData) {
  if ('_id' in data) {
    validateTripUpdate(data);

    const id = await updateTrip(data);

    return id;
  } else {
    validateTripCreate(data);
    return await createTrip(data);
  }
}

export async function deleteTrip(id: string) {
  await deleteTripDb(id);
  await deleteExpenseByTripId(id);

  return id;
}

async function updateTripFields(id: string, data: Partial<TripUpdateData>) {
  const trip = await getTripById(id);

  return saveTrip({
    ...trip,
    ...data,
  });
}

export function archiveTrip(id: string) {
  return updateTripFields(id, { archived: true });
}

export function unarchiveTrip(id: string) {
  return updateTripFields(id, { archived: false });
}

export function updateTripCurrencyConversionFlag(id: string, enableCurrencyConversion: boolean) {
  return updateTripFields(id, { enableCurrencyConversion });
}
