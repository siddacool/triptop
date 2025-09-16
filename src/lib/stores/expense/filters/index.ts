import type { Expense } from '../individual.svelte';
import { getFilteredExpensesSearchFilter } from './searchFilter';

export type ExpenseFilters = {
  search?: string;
};

export function getFilteredExpenses(data: Expense[], filters: ExpenseFilters) {
  let expenses: Expense[] = [];

  expenses = getFilteredExpensesSearchFilter(data, filters.search || '');

  return expenses;
}
