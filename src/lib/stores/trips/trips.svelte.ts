import { nanoid } from 'nanoid';
import { db } from '../db';
import type { ExportTripData, Trip, TripFormData } from './types';
import { useBudgetStore } from '../budget/budget.svelte';
import { useExpenseStore } from '../expense/expense.svelte';

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
          _id: tripFormData._id ? tripFormData._id : nanoid(),
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

        const unordered = await db.trips.toArray();

        data = unordered.sort((a, b) => b?.createdAt - a?.createdAt);

        await useBudgetStore.deleteAllBudgetsFromTrip(idToDelete);
        await useExpenseStore.deleteAllExpensesFromTrip(idToDelete);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async import(exportTripData: ExportTripData) {
      try {
        fetching = true;

        const targetTrip = data.find((item) => item._id === exportTripData.trip._id);

        const tripFormData: TripFormData = {
          _id: exportTripData.trip._id,
          name: exportTripData.trip.name,
          startDate: exportTripData.trip.startDate,
          endDate: exportTripData.trip.endDate,
        };

        if (targetTrip) {
          throw Error('Trip: already exists');
        }

        await this.add(tripFormData);

        await useBudgetStore.import(exportTripData);
        await useExpenseStore.import(exportTripData);

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

export async function getExportTripData(tripId: string) {
  try {
    const trip = useTripsStore.data.find((item) => item._id === tripId);

    if (!trip) {
      throw Error('No trip found');
    }

    const expense = useExpenseStore.data.filter((item) => item.tripId === trip._id);
    const budget = useBudgetStore.data.filter((item) => item.tripId === trip._id);
    const exportedAt = new Date();

    const exportData: ExportTripData = {
      _id: trip._id,
      trip,
      expense,
      budget,
      exportedAt,
    };

    return Promise.resolve(exportData);
  } catch (e) {
    return Promise.reject(e);
  }
}
