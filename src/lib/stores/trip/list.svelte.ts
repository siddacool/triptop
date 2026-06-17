import { db } from '../db';
import type { Trip } from './types';

function createTripListStore() {
  let trips: Trip[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get tripsAll() {
      return trips;
    },
    get tripsActive() {
      return trips.filter((item) => !item.archived);
    },
    get tripsArchived() {
      return trips.filter((item) => item.archived);
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async syncData() {
      const tripsData = await db.trips.toArray();

      tripsData.sort((a, b) => b?.updatedAt - a?.updatedAt);

      trips = tripsData;
    },
    async fetch() {
      try {
        fetching = true;

        await this.syncData();

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    reset() {
      trips = [];
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripListStore = createTripListStore();
