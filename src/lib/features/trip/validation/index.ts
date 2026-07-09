import type { TripCreateData, TripUpdateData } from '../types';

export function validateTripCreate(data: TripCreateData) {
  if (!data.currency) {
    throw new Error('Currency is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}

export function validateTripUpdate(data: TripUpdateData) {
  if (!data.currency) {
    throw new Error('Currency is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}
