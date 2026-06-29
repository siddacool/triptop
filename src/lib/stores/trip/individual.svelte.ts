import { db } from '../db';
import type { Trip, TripDeviceOnlyData } from './types';

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
        if (fetching) {
          return;
        }

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
    async updateEnableCurrencyConversion(enableCondition: boolean) {
      try {
        if (!trip) {
          return;
        }

        if (!trip.id) {
          return;
        }

        let deviceOnlyData: TripDeviceOnlyData = trip.deviceOnlyData || {};

        deviceOnlyData = {
          ...deviceOnlyData,
          enableCurrencyConversion: enableCondition,
        };

        const newTrip: Trip = {
          ...trip,
          deviceOnlyData,
        };

        trip = newTrip;

        await db.trips.update(trip.id, {
          ...newTrip,
          updatedAt: Date.now(),
        });
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
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
