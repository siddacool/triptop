import { getLocalStoreData } from '$lib/utils/storage';
import type { ExpenseFilters } from '../types/filters';

const dataFromStorage = getLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters');

function createExpenseFiltersStore() {
  let filters = $state(dataFromStorage || {});

  return {
    get filters() {
      return filters;
    },
    get isSpecialFiltersActive() {
      return filters?.category || filters?.minDate || filters?.maxDate ? true : false;
    },
    update(value: ExpenseFilters) {
      filters = { ...value };
    },
  };
}

export const expenseFiltersStore = createExpenseFiltersStore();
