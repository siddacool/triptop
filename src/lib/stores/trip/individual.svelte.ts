import { db } from '../db';
import type { Trip } from './types';

function createTripStore() {
  let trip: Trip | undefined = $state();
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get trip() {
      return trip;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripId: string) {
      try {
        fetching = true;

        const data = await db.trips.where({ _id: tripId }).first();

        if (!data?._id) {
          throw new Error('Trip not found');
        }

        trip = data;

        mounted = true;

        return Promise.resolve(tripId);
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    reset() {
      trip = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripStore = createTripStore();
