import type { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
import { deleteExpenseByTripId } from '$lib/features/expense/logic/crud.svelte';
import { createTrip, updateTrip, deleteTrip as deleteTripDb, getTripById } from '../db';
import { tripDetailStore } from '../store/detail.svelte';
import type { TripCreateData, Trip } from '../types';
import { validateTripCreate, validateTripUpdate } from '../validation';

export async function saveTrip(data: TripCreateData | Trip) {
  if ('_id' in data) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { name, deviceOnlyData, ...restData } = data;

    const newData: Trip = {
      name: name.trim(),
      ...restData,
    };

    validateTripUpdate(data);

    const id = await updateTrip(newData);

    tripDetailStore.load(data._id);

    return id;
  } else {
    const { name, ...restData } = data;

    const newData: TripCreateData = {
      name: name.trim(),
      ...restData,
    };

    validateTripCreate(newData);

    return await createTrip(newData);
  }
}

export async function deleteTrip(id: string) {
  await deleteTripDb(id);
  await deleteExpenseByTripId(id);

  return id;
}

async function updateTripFields(id: string, data: Partial<Trip>) {
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

export async function updateTripLiveCurrencyExchangeActiveCurrency(
  id: string,
  liveCurrencyExchangeActiveCurrency: LiveCurrencyExchangeActiveCurrency,
) {
  const trip = await getTripById(id);

  if (liveCurrencyExchangeActiveCurrency === trip.liveCurrencyExchangeActiveCurrency) {
    return trip._id;
  }

  return updateTripFields(id, { liveCurrencyExchangeActiveCurrency });
}
