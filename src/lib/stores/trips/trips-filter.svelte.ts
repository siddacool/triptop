import { browser } from '$app/environment';
import { timeout } from '$lib/helpers/time';
import { DEFUALT_CURRENCY } from '../currency/currency-codes';
import { attachBudgetDetailsToExpense, useExpenseStore } from '../expense/expense.svelte';
import { PaymentModes } from '../payment-mode/types';
import type { TripFilters } from './types';

const TRIP_EXPENSE_FILTERS_PANEL = 'TRIP_EXPENSE_FILTERS_PANEL';
const TRIP_EXPENSE_FILTERS = 'TRIP_EXPENSE_FILTERS';

function getDefaultTripExpenseFiltersPanel() {
  if (!browser) {
    return true;
  }

  const value = localStorage.getItem(TRIP_EXPENSE_FILTERS_PANEL) === 'true' ? true : false;

  return value;
}

function getDefaultTripExpenseFilters(): TripFilters {
  if (!browser) {
    return {};
  }

  const value = JSON.parse(sessionStorage.getItem(TRIP_EXPENSE_FILTERS) || `{}`) as TripFilters;

  return value;
}

function createTripsFilterStore() {
  let open: boolean = $state(getDefaultTripExpenseFiltersPanel());
  let updatedAt: number = $state(Date.now());
  let filters: TripFilters = $state(getDefaultTripExpenseFilters());

  return {
    get open() {
      return open;
    },
    get filters() {
      return filters;
    },
    get isFilters() {
      if (this.filters.budget?.length) {
        return true;
      }

      if (this.filters.category?.length) {
        return true;
      }

      if (this.filters.paymentMode?.length) {
        return true;
      }

      if (this.filters.currency?.length) {
        return true;
      }

      return false;
    },
    get updatedAt() {
      return updatedAt;
    },
    async toggleFiltersPanelOpen() {
      const newState = !open;
      open = newState;

      if (browser) {
        localStorage.setItem(TRIP_EXPENSE_FILTERS_PANEL, newState ? 'true' : 'false');
      }

      return Promise.resolve();
    },
    async updateFilters(data: Partial<TripFilters>) {
      const newData: TripFilters = {
        ...filters,
        ...data,
      };

      filters = { ...newData };

      if (browser) {
        sessionStorage.setItem(TRIP_EXPENSE_FILTERS, JSON.stringify(newData));
      }

      updatedAt = Date.now();

      return Promise.resolve();
    },
    async clearFilters() {
      const newData: TripFilters = {
        searchTerm: filters.searchTerm,
      };

      filters = { ...newData };

      if (browser) {
        sessionStorage.setItem(TRIP_EXPENSE_FILTERS, JSON.stringify(newData));
      }

      updatedAt = Date.now();

      return Promise.resolve();
    },
    async clearAllFilters() {
      filters = {};

      if (browser) {
        sessionStorage.removeItem(TRIP_EXPENSE_FILTERS);
      }

      updatedAt = Date.now();

      return Promise.resolve();
    },
  };
}

export const useTripsFilterStore = createTripsFilterStore();

export async function getFiltredExpenses() {
  try {
    let expense = useExpenseStore.data;

    if (!expense.length) {
      return expense;
    }

    await timeout(50);

    const filters = useTripsFilterStore.filters;
    const searchTerm = filters.searchTerm?.trim().toLocaleLowerCase();
    const budget = filters.budget?.length ? filters.budget : undefined;
    const category = filters.category?.length ? filters.category : undefined;
    const paymentMode = filters.paymentMode?.length ? filters.paymentMode : undefined;
    const currency = filters.currency?.length ? filters.currency : undefined;

    if (
      !searchTerm &&
      !budget?.length &&
      !category?.length &&
      !paymentMode?.length &&
      !currency?.length
    ) {
      return expense;
    }

    expense = expense.map((item) => attachBudgetDetailsToExpense(item));

    if (searchTerm) {
      expense = expense.filter((item) => item.name.toLocaleLowerCase().trim().includes(searchTerm));
    }

    if (budget?.length) {
      expense = expense.filter((item) => {
        const expenseBudgetId = item.budgetId || 'other';

        if (budget.includes(expenseBudgetId)) {
          return true;
        }

        return false;
      });
    }

    if (category?.length) {
      expense = expense.filter((item) => {
        const expenseCategory = item.category || 'misc';

        if (category.includes(expenseCategory)) {
          return true;
        }

        return false;
      });
    }

    if (paymentMode?.length) {
      expense = expense.filter((item) => {
        const expensePaymentMode = item.paymentMode || PaymentModes.CASH;

        if (paymentMode.includes(expensePaymentMode)) {
          return true;
        }

        return false;
      });
    }

    if (currency?.length) {
      expense = expense.filter((item) => {
        const expenseCurrency = item.currency || DEFUALT_CURRENCY.alphabeticCode;

        if (currency.includes(expenseCurrency)) {
          return true;
        }

        return false;
      });
    }

    return Promise.resolve(expense);
  } catch (e) {
    return Promise.reject(e);
  }
}
