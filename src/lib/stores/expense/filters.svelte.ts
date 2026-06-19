import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
import type { Category } from '../category/types';

export type ExpenseFiltersBase = {
  search?: string;
};

export type ExpenseFiltersSpecial = {
  category?: Category;
  minDate?: string;
  maxDate?: string;
};

export type ExpenseFilters = ExpenseFiltersBase & ExpenseFiltersSpecial;

const defaultStorageDataSpecailFilters: ExpenseFiltersSpecial = {
  category: undefined,
  minDate: undefined,
  maxDate: undefined,
};

const defaultStorageData: ExpenseFilters = {
  search: '',
  ...defaultStorageDataSpecailFilters,
};

const dataFromStorage = getLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters');

function createExpenseFiltersStore() {
  let filters = $state(dataFromStorage || {});

  return {
    get filters() {
      return filters;
    },
    get searchFilter() {
      return filters?.search;
    },
    get isSpecialFiltersActive() {
      return filters?.category || filters.maxDate || filters.maxDate ? true : false;
    },
    updateFilter(value: Partial<ExpenseFilters>) {
      const newFilters = {
        ...filters,
        ...value,
      };

      filters = newFilters;

      setLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters', newFilters);
    },
    updateSearchFilter(value: string) {
      this.updateFilter({
        search: value,
      });
    },
    clearSpecialFilters() {
      filters = {
        ...filters,
        ...defaultStorageDataSpecailFilters,
      };
    },
    reset() {
      filters = defaultStorageData;

      setLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters', defaultStorageData);
    },
  };
}

export const useExpenseFiltersStore = createExpenseFiltersStore();
