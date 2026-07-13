import { expenseListStore } from '$lib/features/expense/store/list.svelte';
import { type GroupStats, type ExpenseSummary } from '../types';
import { createStats } from '../utils/create-stats/create-stats';

function createStatsStore() {
  let categoryStats: GroupStats[] = $state([]);
  let dateStats: GroupStats[] = $state([]);
  let tripSummary: ExpenseSummary | undefined = $state(undefined);

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
    async load() {
      try {
        const expensesData = expenseListStore.expenses;

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

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.clear();

        return Promise.reject(e);
      }
    },
    clear() {
      categoryStats = [];
      dateStats = [];
      tripSummary = undefined;
    },
  };
}

export const statsStore = createStatsStore();
