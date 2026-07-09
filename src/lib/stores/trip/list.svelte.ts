import { db } from '$lib/db';
import { type Trip } from './types';

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
    async fetch() {
      try {
        if (fetching) {
          return;
        }

        fetching = true;

        const tripsData = await db.trips.toArray();

        tripsData.sort((a, b) => b?.updatedAt - a?.updatedAt);

        trips = tripsData;

        mounted = true;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      } finally {
        fetching = false;
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
