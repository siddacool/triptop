import { replaceCommasWithDots } from '$lib/helpers/text-manipulations/replace-commas-with-dots';
import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
import { getMoment } from '$lib/helpers/time';
import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
import { categoryOptions, getCurrencyWiseExpenseForTrip } from '$lib/stores/expense/expense.svelte';
import type { ExpenseWithBudget } from '$lib/stores/expense/types';
import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
import { PaymentModes } from '$lib/stores/payment-mode/types';
import type { ExportTripData, Trip } from '$lib/stores/trips/types';

export type ExportTripCSVData = {
  _id: string;
  trip: Trip;
  expense: ExpenseWithBudget[];
};

function convertToExportTripCSVData(exportTripData: ExportTripData) {
  const expenseData: ExpenseWithBudget[] = [];

  exportTripData.expense.forEach((expense) => {
    const targetBudget = useBudgetStore.data.find((item) => item._id === expense.budgetId);
    const currency = targetBudget?.currency || expense.currency || DEFUALT_CURRENCY.alphabeticCode;
    const paymentMode = targetBudget?.paymentMode || expense.paymentMode || PaymentModes.CASH;
    const budgetName = targetBudget?.name || 'Other';

    expenseData.push({
      ...expense,
      paymentMode,
      currency,
      budgetName,
    });
  });

  const data: ExportTripCSVData = {
    _id: exportTripData._id,
    trip: exportTripData.trip,
    expense: expenseData,
  };

  return data;
}

export function makeTripExportCsv(exportTripData: ExportTripData) {
  let csv = `Name,Currency,Amount,Category,Payment Mode,Budget,Time,Date\n`;

  const csvData = convertToExportTripCSVData(exportTripData);

  csvData.expense.forEach((item) => {
    const category =
      categoryOptions.find((categoryItem) => categoryItem.value === item.category)?.label ||
      'Other';

    const paymentMode = simplifyText(
      paymentModeOptions.find((paymentModeItem) => paymentModeItem.value === item.paymentMode)
        ?.label || paymentModeOptions[0].label,
    );

    const name = `${replaceCommasWithDots(item.name)}`;
    const budgetName = `${replaceCommasWithDots(item.budgetName)}`;
    const time = `${getMoment(item.date).format('hh:mm a')}`;
    const date = `${getMoment(item.date).format('DD-MM-YYYY')}`;

    csv += `${name},${item.currency},${item.amount},${category},${paymentMode},${budgetName},${time},${date}\n`;
  });

  csv += `\n\n`;

  const tripName = replaceCommasWithDots(exportTripData.trip.name);

  csv += `${tripName}\n`;

  const expenses = getCurrencyWiseExpenseForTrip(exportTripData._id);

  expenses.forEach((item) => {
    csv += `${item.currency},${item.total}\n`;
  });

  return csv;
}
