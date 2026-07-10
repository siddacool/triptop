import { expenseListStore } from '$lib/features/expense/store/list.svelte';
import { type GroupStats, type ExpenseSummary } from './types';
import { createStats } from './utils/create-stats/create-stats';

function createTripStatsStore() {
  let categoryStats: GroupStats[] = $state([]);
  let dateStats: GroupStats[] = $state([]);
  let tripSummary: ExpenseSummary | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get tripSummary() {
      return tripSummary;
    },
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

        const expensesData = [...expenseListStore.expenses].sort((a, b) =>
          a.date.localeCompare(b.date),
        );

        if (!expensesData.length) {
          categoryStats = [];
          dateStats = [];
          tripSummary = undefined;
          return;
        }

        const stats = createStats(expensesData);

        tripSummary = stats.tripSummary;
        categoryStats = stats.categoryStats;
        dateStats = stats.dateStats;

        console.log('debug:stats', stats);

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
      tripSummary = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripStatsStore = createTripStatsStore();
