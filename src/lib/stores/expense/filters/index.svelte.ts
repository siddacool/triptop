import type { Category, Expense, PaymentModes } from '../individual.svelte';
import { getFilteredExpensesSearchFilter } from './searchFilter';
import { getFilteredExpensesSelectiveFilters } from './selectiveFilters/selectiveFilters';

export type ExpenseSelectiveFilters = {
  category?: Category[];
  paymentMode?: PaymentModes[];
  currency?: string[];
};

export type ExpenseFilters = {
  search?: string;
  selectiveFilters?: ExpenseSelectiveFilters;
};

function createExpenseFiltersStore() {
  let filters: ExpenseFilters = $state({});

  return {
    get filters() {
      return filters;
    },
    get selectiveFilters() {
      return filters.selectiveFilters || {};
    },
    get isAnySelectiveFilters() {
      return Object.values(this.selectiveFilters).some((v) => v !== null && v !== undefined);
    },
    updateFilters(newFilters: Partial<ExpenseFilters>) {
      filters = {
        ...filters,
        ...newFilters,
      };
    },
    updateSelectiveFilters(newFilters: Partial<ExpenseSelectiveFilters>) {
      const selectiveFilters: ExpenseSelectiveFilters = {
        ...(filters.selectiveFilters || {}),
        ...newFilters,
      };

      this.updateFilters({ selectiveFilters });
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
  expenses = getFilteredExpensesSelectiveFilters(data, filters.selectiveFilters);

  return expenses;
}

export function getIsAnyExpenseSelectiveFilters(data: Expense[], filters: ExpenseFilters) {
  let expenses: Expense[] = [];

  expenses = getFilteredExpensesSearchFilter(data, filters.search || '');

  return expenses;
}
