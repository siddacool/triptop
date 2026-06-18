import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';

export type ExpenseFilters = {
  search?: string;
};

const defaultStorageData: ExpenseFilters = {
  search: '',
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
    reset() {
      filters = defaultStorageData;

      setLocalStoreData<ExpenseFilters>('session', 'ExpenseFilters', defaultStorageData);
    },
  };
}

export const useExpenseFiltersStore = createExpenseFiltersStore();
