import { getLocalStoreData } from '$lib/helpers/storage';
import type { ExpenseFilters } from '../types/filters';

const dataFromStorage = getLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters');

function createExpenseFiltersStore() {
  let filters = $state(dataFromStorage || {});

  return {
    get filters() {
      return filters;
    },
    update(value: ExpenseFilters) {
      filters = { ...value };
    },
  };
}

export const expenseFiltersStore = createExpenseFiltersStore();
