import { getTripById } from '../db';
import type { Trip } from '../types';

function createTripDetailStore() {
  let trip = $state<Trip | undefined>(undefined);

  return {
    get trip() {
      return trip;
    },
    async load(tripId: string) {
      trip = await getTripById(tripId);
    },
    clear() {
      trip = undefined;
    },
  };
}

export const tripDetailStore = createTripDetailStore();
