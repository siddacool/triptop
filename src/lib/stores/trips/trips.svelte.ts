import type { ExportTripData, Trip, TripFormData } from './types';
import { useBudgetStore } from '../budget/budget.svelte';
import { useExpenseStore } from '../expense/expense.svelte';
import { addTrip, deleteTrip, getTrips, updateTrip } from '$lib/api/trips';

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

        data = await getTrips();

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

        data = await addTrip(tripFormData);

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

        data = await updateTrip(idToUpdate, tripFormData);

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

        data = await deleteTrip(idToDelete);

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
