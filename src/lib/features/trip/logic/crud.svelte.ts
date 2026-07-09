import { createTrip, updateTrip, deleteTrip as deleteTripDb, getTripById } from '../db';
import { tripDetailStore } from '../store/detail.svelte';
import type { TripCreateData, TripUpdateData } from '../types';
import { validateTripCreate, validateTripUpdate } from '../validation';

export async function saveTrip(data: TripCreateData | TripUpdateData) {
  if ('_id' in data) {
    validateTripUpdate(data);

    const id = await updateTrip(data);

    await tripDetailStore.load(data._id);

    return id;
  } else {
    validateTripCreate(data);
    return await createTrip(data);
  }
}

export function deleteTrip(id: string) {
  // delete related expenses
  return deleteTripDb(id);
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
