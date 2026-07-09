import { setLocalStoreData } from '$lib/helpers/storage';
import { expenseFiltersStore } from '../store/filters.svelte';
import type { ExpenseFilters } from '../types/filters';

export function updateExpenseFilters(value: Partial<ExpenseFilters>): ExpenseFilters {
  const filters = {
    ...expenseFiltersStore.filters,
    ...value,
  };

  setLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters', filters);

  expenseFiltersStore.update(filters);

  return filters;
}

export function clearExpenseFilters() {
  const filters: ExpenseFilters = {
    search: '',
    category: undefined,
    minDate: undefined,
    maxDate: undefined,
  };

  return updateExpenseFilters(filters);
}

export function updateExpenseSearchFilter(value: string): ExpenseFilters {
  return updateExpenseFilters({
    search: value,
  });
}

export function clearExpenseSearchFilter(): ExpenseFilters {
  return updateExpenseFilters({
    search: '',
  });
}

export function clearSpecialFilters(): ExpenseFilters {
  return updateExpenseFilters({
    category: undefined,
    minDate: undefined,
    maxDate: undefined,
  });
}
