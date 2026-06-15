import { nanoid } from 'nanoid/non-secure';
import { db } from '../db';
import type { CreateTripFormData } from './createTrip.svelte';
import type { Trip } from './types';

function createTripsStore() {
  let trips: Trip[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get trips() {
      return trips;
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
    async _createNewTrip(formData: CreateTripFormData) {
      if (!formData?.name?.trim()) {
        return;
      }

      if (!formData?.currency?.trim()) {
        return;
      }

      const newTripId = nanoid();

      await db.trips.add({
        _id: newTripId,
        name: formData.name.trim(),
        currency: formData.currency,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      await this.syncData();

      return Promise.resolve(newTripId);
    },
    async updateTripById(tripId: string, formData: CreateTripFormData) {
      const target = trips.find((item) => item._id === tripId);

      if (!target?.id) {
        return;
      }

      if (!formData?.name?.trim()) {
        return;
      }

      await db.trips.update(target.id, {
        name: formData.name.trim(),
        currency: formData.currency,
        updatedAt: Date.now(),
      });

      await this.syncData();
    },
    async deleteTripById(tripId: string) {
      const target = trips.find((item) => item._id === tripId);

      if (!target?.id) {
        return;
      }

      await db.trips.delete(target.id);

      await this.syncData();
    },
    reset() {
      trips = [];
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripsStore = createTripsStore();
