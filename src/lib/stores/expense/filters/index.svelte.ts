import type { Expense } from '../individual.svelte';
import { getFilteredExpensesSearchFilter } from './searchFilter';

export type ExpenseFilters = {
  search?: string;
};

function createExpenseFiltersStore() {
  let filters: ExpenseFilters = $state({});

  return {
    get filters() {
      return filters;
    },
    updateFilters(newFilters: Partial<ExpenseFilters>) {
      filters = {
        ...filters,
        ...newFilters,
      };
    },
    reset() {
      filters = {};
    },
  };
}

export const useExpenseFiltersStore = createExpenseFiltersStore();

export function getFilteredExpenses(data: Expense[], filters: ExpenseFilters) {
  let expenses: Expense[] = [];

  expenses = getFilteredExpensesSearchFilter(data, filters.search || '');

  return expenses;
}
