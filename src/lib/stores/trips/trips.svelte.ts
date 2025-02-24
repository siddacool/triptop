import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Trip, TripFormData } from './types';
import { useBudgetStore } from '../budget/budget.svelte';
import { useExpenseStore } from '../expense/expense.svelte';
import { useLocalSettingsStore } from '../local-settings/local-settings.svelte';

async function getTrip(idToFind: string) {
  try {
    const trip = await db.trips.where({ _id: idToFind }).first();

    return Promise.resolve(trip);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createTripsStore() {
  let data: Trip[] = $state([]);
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
    async init() {
      try {
        fetching = true;

        const unordered = await db.trips?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    async add(tripFormData: TripFormData) {
      try {
        fetching = true;

        await db.trips.add({
          _id: nanoid(),
          name: tripFormData.name.trim(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          startDate: tripFormData.startDate,
          endDate: tripFormData.endDate,
        });

        const unordered = await db.trips?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, tripFormData: TripFormData) {
      try {
        fetching = true;

        const targetTrip = await getTrip(idToUpdate);

        if (!targetTrip) {
          throw Error('Trip:update: trip is missing');
        }

        await db.trips.update(targetTrip.id, {
          name: tripFormData.name.trim(),
          updatedAt: Date.now(),
          startDate: tripFormData.startDate,
          endDate: tripFormData.endDate,
        });

        const unordered = await db.trips?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;

        const targetTrip = await getTrip(idToDelete);

        if (!targetTrip) {
          throw Error('Trip:delete: Trip is missing');
        }

        await db.trips.delete(targetTrip.id);

        const unordered = await db.trips?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        await useBudgetStore.deleteAllBudgetsFromTrip(idToDelete);
        await useExpenseStore.deleteAllExpensesFromTrip(idToDelete);

        useLocalSettingsStore.resetLastOpenTrip();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const useTripsStore = createTripsStore();
