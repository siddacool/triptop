import { db } from '../db';
import type { CreateTripFormData } from './create.svelte';

export interface Trip {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

function createTripStore() {
  let data: Trip | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get data() {
      return data;
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

        data = await db.trips.where({ _id: tripId }).first();

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    async update(formData: CreateTripFormData) {
      if (!formData?.name?.trim()) {
        return;
      }

      await db.trips.update(data?.id, {
        name: formData.name.trim(),
        updatedAt: Date.now(),
      });
    },
    async delete() {
      await db.trips.delete(data?.id);
    },
    reset() {
      data = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripStore = createTripStore();
