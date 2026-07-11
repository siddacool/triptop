import { listTrips } from '../db';
import type { Trip } from '../types';

function createTripListStore() {
  let trips = $state<Trip[]>([]);

  return {
    get trips() {
      return trips;
    },
    get tripsActive() {
      return trips.filter((t) => !t.archived);
    },
    get tripsArchived() {
      return trips.filter((t) => t.archived);
    },
    async load() {
      trips = await listTrips();
    },
  };
}

export const tripListStore = createTripListStore();
