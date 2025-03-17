import type { ExportTripData, Trip } from './types';
import { getTripById } from '$lib/api/trips';
import { useExpenseStore } from '../expense/expense.svelte';
import { useBudgetStore } from '../budget/budget.svelte';

function createTripByIdStore() {
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
    async init(idToFind: string) {
      try {
        fetching = true;

        data = await getTripById(idToFind);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
  };
}

export const useTripByIdStore = createTripByIdStore();

export async function getExportTripData() {
  try {
    const trip = useTripByIdStore.data;

    if (!trip) {
      throw Error('No trip found');
    }

    const expense = useExpenseStore.data;
    const budget = useBudgetStore.data;
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
