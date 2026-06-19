import type { ExpenseFilters } from '../../filters.svelte';
import type { Expense } from '../../types';
import { categoryFilter } from './categoryFilter';
import { maxDateFilter } from './maxDateFilter';
import { minDateFilter } from './minDateFilter';
import { searchFilter } from './searchFilter';

export function getFilteredExpenses(filters: ExpenseFilters, data: Expense[]) {
  let result = data;

  if (filters.search) {
    result = searchFilter(filters.search, data);
  }

  if (filters.category) {
    result = categoryFilter(filters.category, data);
  }

  if (filters.minDate) {
    result = minDateFilter(filters.minDate, data);
  }

  if (filters.maxDate) {
    result = maxDateFilter(filters.maxDate, data);
  }

  return result;
}
