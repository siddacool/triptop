import { db } from '$lib/db';
import type { TripFormData } from '$lib/stores/trips/types';
import { nanoid } from 'nanoid';

export async function getTrips() {
  const trips = await db.trips.toArray();
  const ordered = trips.sort((a, b) => b?.createdAt - a?.createdAt);

  return ordered;
}

export async function getTripById(tripId: string) {
  const trip = await db.trips.where({ _id: tripId }).first();

  return trip;
}

export async function addTrip(formData: TripFormData) {
  await db.trips.add({
    _id: formData._id ? formData._id : nanoid(),
    name: formData.name.trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    startDate: formData.startDate,
    endDate: formData.endDate,
  });

  const data = await getTrips();

  return data;
}

export async function updateTrip(tripId: string, formData: TripFormData) {
  const targetTrip = await getTripById(tripId);

  if (!targetTrip) {
    throw Error('Trip:update: trip is missing');
  }

  await db.trips.update(targetTrip.id, {
    name: formData.name.trim(),
    updatedAt: Date.now(),
    startDate: formData.startDate,
    endDate: formData.endDate,
  });

  const data = await getTrips();

  return data;
}

export async function deleteTrip(tripId: string) {
  const targetTrip = await getTripById(tripId);

  if (!targetTrip) {
    throw Error('Trip:update: trip is missing');
  }

  await db.trips.delete(targetTrip.id);

  const data = await getTrips();

  return data;
}
