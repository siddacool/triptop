import type { Expense } from '../../types';
import type { ExpenseFilters } from '../../types/filters';
import { categoryFilter } from './categoryFilter/categoryFilter';
import { dateFilter } from './dateFilter/dateFilter';
import { searchFilter } from './searchFilter/searchFilter';

export function getFilteredExpenses(filters: ExpenseFilters, data: Expense[]) {
  let result = data;

  if (filters.search) {
    result = searchFilter(filters.search, data);
  }

  if (filters.category) {
    result = categoryFilter(filters.category, data);
  }

  if (filters.minDate || filters.maxDate) {
    result = dateFilter(filters.minDate, filters.maxDate, data);
  }

  return result;
}
