import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { TripCreateData, TripUpdateData } from '../types';

export async function listTrips() {
  let trips = await db.trips.toArray();

  trips = trips.sort((a, b) => b?.updatedAt - a?.updatedAt);

  return trips;
}

export async function getTripById(id: string) {
  const trip = await db.trips.where({ _id: id }).first();

  if (!trip) {
    throw new Error('Trip not found');
  }

  return trip;
}

export async function createTrip(data: TripCreateData) {
  const newId = nanoid();

  const { name, ...restData } = data;

  const now = Date.now();

  await db.trips.add({
    _id: newId,
    name: name.trim(),
    ...restData,
    createdAt: now,
    updatedAt: now,
  });

  return newId;
}

export async function updateTrip(data: TripUpdateData) {
  const id = data._id;
  const trip = await getTripById(id);

  const { name, ...restData } = data;

  await db.trips.update(trip.id, {
    name: name.trim(),
    ...restData,
    updatedAt: Date.now(),
  });

  return id;
}

export async function deleteTrip(id: string) {
  const trip = await getTripById(id);

  await db.trips.delete(trip.id);

  return id;
}
