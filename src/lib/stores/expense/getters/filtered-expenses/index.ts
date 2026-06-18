import type { ExpenseFilters } from '../../filters.svelte';
import type { Expense } from '../../types';
import { searchFilter } from './searchFilter';

export function getFilteredExpenses(filters: ExpenseFilters, data: Expense[]) {
  let result = data;

  if (filters.search) {
    result = searchFilter(filters.search, data);
  }

  return result;
}
