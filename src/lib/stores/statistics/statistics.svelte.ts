import { browser } from '$app/environment';
import { DateFormats, getMoment } from '$lib/helpers/time';
import { useBudgetStore } from '../budget/budget.svelte';
import {
  attachBudgetDetailsToExpense,
  categoryOptions,
  useExpenseStore,
} from '../expense/expense.svelte';
import { paymentModeOptions } from '../payment-mode/payment-mode.svelte';
import { PaymentModes } from '../payment-mode/types';
import type {
  BudgetWiseStatsExpense,
  CategoryWiseStatsExpense,
  PaymentModeWiseStatsExpense,
  StatsTableState,
} from './types';

const STATS_TABLE_STATE = 'STATS_TABLE_STATE';

const defaultTableStatsData: StatsTableState = {
  category: true,
  paymentMode: true,
  budget: true,
};

function getDefaultStatsTableStats() {
  if (!browser) {
    return defaultTableStatsData;
  }

  let values = JSON.parse(localStorage.getItem(STATS_TABLE_STATE) || `{}`);

  values = { ...defaultTableStatsData, ...values };

  return values as StatsTableState;
}

function createStatisticsStore() {
  let startDate: number | undefined = $state(undefined);
  let endDate: number | undefined = $state(undefined);
  let tableState: StatsTableState = $state(getDefaultStatsTableStats());

  return {
    get startDate() {
      return startDate;
    },
    get endDate() {
      return endDate;
    },
    get tableState() {
      return tableState;
    },
    async updateStartDate(date: number | undefined) {
      startDate = date;
      return Promise.resolve();
    },
    async updateEndDate(date: number | undefined) {
      endDate = date;
      return Promise.resolve();
    },
    async updateTableState(data: StatsTableState) {
      const newState = {
        ...tableState,
        ...data,
      };

      tableState = newState;

      if (browser) {
        localStorage.setItem(STATS_TABLE_STATE, JSON.stringify(newState));
      }

      return Promise.resolve();
    },
  };
}

export const useStatisticsStore = createStatisticsStore();

export function getExpenseForDateRange(tripId: string, startDate?: number, endDate?: number) {
  let targetExpenses = useExpenseStore.data.filter((item) => item.tripId === tripId);

  if (startDate && !endDate) {
    const startDateFormatted = getMoment(startDate).format(DateFormats.YEAR_FIRST_STANDARD);

    targetExpenses = targetExpenses.filter(
      (item) => getMoment(item.date).format(DateFormats.YEAR_FIRST_STANDARD) === startDateFormatted,
    );
  } else if (startDate && endDate) {
    const startDateFormatted = getMoment(startDate).startOf('D');
    const endDateFormatted = getMoment(endDate).startOf('D');

    targetExpenses = targetExpenses.filter((item) => {
      const itemDateFormatted = getMoment(item.date).startOf('D');

      if (itemDateFormatted.isBefore(startDateFormatted)) {
        return false;
      }

      if (itemDateFormatted.isAfter(endDateFormatted)) {
        return false;
      }

      return true;
    });
  }

  return targetExpenses;
}

export function getCategoryWiseExpense(tripId: string, startDate?: number, endDate?: number) {
  let targetExpenses = getExpenseForDateRange(tripId, startDate, endDate);

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const expenses: CategoryWiseStatsExpense[] = categoryOptions.map((item) =>
    Object.assign({
      category: item.value,
      expenses: [],
    }),
  );

  targetExpenses.forEach((item) => {
    const itemCategory = item.category;

    const targetIndex = expenses.findIndex((item) => item.category === itemCategory);

    if (targetIndex >= 0) {
      expenses[targetIndex].expenses.push(item);
    }
  });

  return expenses;
}

export function getPaymentModeWiseExpense(tripId: string, startDate?: number, endDate?: number) {
  let targetExpenses = getExpenseForDateRange(tripId, startDate, endDate);

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const expenses: PaymentModeWiseStatsExpense[] = paymentModeOptions.map((item) =>
    Object.assign({
      paymentMode: item.value,
      expenses: [],
    }),
  );

  targetExpenses.forEach((item) => {
    const itemPaymentMode = item.paymentMode || PaymentModes.CASH;

    const targetIndex = expenses.findIndex(
      (item) => (item.paymentMode || PaymentModes.CASH) === itemPaymentMode,
    );

    if (targetIndex >= 0) {
      expenses[targetIndex].expenses.push(item);
    }
  });

  return expenses;
}

export function getBudgetWiseExpense(tripId: string, startDate?: number, endDate?: number) {
  let targetExpenses = getExpenseForDateRange(tripId, startDate, endDate);

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const budgets = useBudgetStore.data.filter((item) => item.tripId === tripId);

  const expenses: BudgetWiseStatsExpense[] = budgets.map((item) =>
    Object.assign({
      name: item.name,
      budgetId: item._id,
      expenses: [],
      paymentMode: item.paymentMode,
    }),
  );

  expenses.push(
    ...[
      {
        name: 'Other - Cash',
        expenses: [],
        paymentMode: PaymentModes.CASH,
      },
      {
        name: 'Other - Card',
        expenses: [],
        paymentMode: PaymentModes.CARD,
      },
    ],
  );

  targetExpenses.forEach((item) => {
    const itemBudgetName = item.budgetName
      ? item.budgetName
      : `Other - ${item.paymentMode === PaymentModes.CARD ? 'Card' : 'Card'}`;

    const targetIndex = expenses.findIndex((item) => item.name === itemBudgetName);

    if (targetIndex >= 0) {
      expenses[targetIndex].expenses.push(item);
    }
  });

  return expenses;
}
