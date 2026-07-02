import { getExpensesTotal } from '../expense/getters/total-expenses';
import { useExpenseListStore } from '../expense/list.svelte';
import { type CategoryStats, type DateStats } from './types';
import { createCategoryStats } from './utils/create-category-stats';
import { createDateStats } from './utils/create-date-stats';

function createTripStatsStore() {
  let categoryStats: CategoryStats[] = $state([]);
  let dateStats: DateStats[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get categoryStats() {
      return categoryStats;
    },
    get dateStats() {
      return dateStats;
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

        const expensesData = useExpenseListStore.expenses;

        if (!expensesData.length) {
          categoryStats = [];
          dateStats = [];
          return;
        }

        const tripTotal = getExpensesTotal(expensesData);

        categoryStats = createCategoryStats(expensesData, tripTotal);
        dateStats = createDateStats(expensesData, tripTotal);

        console.log('debug:', categoryStats, dateStats);

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
      categoryStats = [];
      dateStats = [];
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripStatsStore = createTripStatsStore();
