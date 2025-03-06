import { getMoment } from '$lib/helpers/time';
import {
  attachBudgetDetailsToExpense,
  categoryOptions,
  useExpenseStore,
} from '../expense/expense.svelte';
import { paymentModeOptions } from '../payment-mode/payment-mode.svelte';
import { PaymentModes } from '../payment-mode/types';
import type { CategoryWiseExpense, PaymentModeWiseExpense } from './types';

function createStatisticsStore() {
  let startDate: number | undefined = $state(undefined);
  let endDate: number | undefined = $state(undefined);

  return {
    get startDate() {
      return startDate;
    },
    get endDate() {
      return endDate;
    },
    async updateStartDate(date: number | undefined) {
      startDate = date;
      return Promise.resolve();
    },
    async updateEndDate(date: number | undefined) {
      endDate = date;
      return Promise.resolve();
    },
  };
}

export const useStatisticsStore = createStatisticsStore();

export function getCategoryWiseExpense(tripId: string, startDate?: number, endDate?: number) {
  let targetExpenses = useExpenseStore.data.filter((item) => item.tripId === tripId);

  if (startDate && !endDate) {
    const startDateFormatted = getMoment(startDate).format('YYYY-MM-DD');

    targetExpenses = targetExpenses.filter(
      (item) => getMoment(item.date).format('YYYY-MM-DD') === startDateFormatted,
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

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const expenses: CategoryWiseExpense[] = categoryOptions.map((item) =>
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
  let targetExpenses = useExpenseStore.data.filter((item) => item.tripId === tripId);

  if (startDate && !endDate) {
    const startDateFormatted = getMoment(startDate).format('YYYY-MM-DD');

    targetExpenses = targetExpenses.filter(
      (item) => getMoment(item.date).format('YYYY-MM-DD') === startDateFormatted,
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

  targetExpenses = targetExpenses.map((item) => attachBudgetDetailsToExpense(item));

  const expenses: PaymentModeWiseExpense[] = paymentModeOptions.map((item) =>
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
