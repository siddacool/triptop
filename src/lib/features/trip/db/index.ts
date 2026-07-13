import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Trip, TripCreateData } from '../types';

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

  const now = Date.now();

  await db.trips.add({
    _id: newId,
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return newId;
}

export async function updateTrip(data: Trip) {
  await db.trips.update(data.id, {
    ...data,
    updatedAt: Date.now(),
  });

  return data._id;
}

export async function deleteTrip(id: string) {
  const trip = await getTripById(id);

  await db.trips.delete(trip.id);

  return id;
}
