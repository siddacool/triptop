import type { MoneyValue } from '../currency/types';
import {
  getExpensesTotal,
  getExpensesTotalAmountHomeCurrency,
} from '../expense/getters/total-expenses';
import { useExpenseListStore } from '../expense/list.svelte';
import { type CategoryStats, type DateStats, type DateSummary } from './types';
import { createCategoryStats } from './utils/create-category-stats';
import { createDateStats } from './utils/create-date-stats';

function createTripStatsStore() {
  let categoryStats: CategoryStats[] = $state([]);
  let dateStats: DateStats[] = $state([]);
  let total: MoneyValue = $state({
    amount: 0,
    amountHomeCurrency: 0,
  });
  let expenseCount: number = $state(0);
  let dateSummary: DateSummary | undefined = $state(undefined);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get categoryStats() {
      return categoryStats;
    },
    get dateStats() {
      return dateStats;
    },
    get expenseCount() {
      return expenseCount;
    },
    get dateSummary() {
      return dateSummary;
    },
    get total() {
      return total;
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

        const expensesData = [...useExpenseListStore.expenses].sort((a, b) =>
          a.date.localeCompare(b.date),
        );

        if (!expensesData.length) {
          categoryStats = [];
          dateStats = [];
          return;
        }

        total = {
          amount: getExpensesTotal(expensesData),
          amountHomeCurrency: getExpensesTotalAmountHomeCurrency(expensesData),
        };

        categoryStats = createCategoryStats(expensesData, total.amount);
        dateStats = createDateStats(expensesData, total.amount);
        expenseCount = expensesData.length;

        dateSummary = {
          startDate: expensesData[0].date,
          endDate: expensesData[expensesData.length - 1].date,
        };

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
      expenseCount = 0;
      dateSummary = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useTripStatsStore = createTripStatsStore();
