import { calculateAverage } from '$lib/helpers/calculateAverage';
import { calculateShare } from '$lib/helpers/calculateShare';
import type { MoneyValue } from '$lib/stores/currency/types';
import type { Expense } from '$lib/stores/expense/types';
import type { ExpenseSummary } from '../types';

export function createExpenseSummary(
  expenses: Expense[],
  tripTotal: number,
): ExpenseSummary | null {
  const expenseCount = expenses.length;

  if (!expenseCount) {
    return null;
  }

  const total: MoneyValue = {
    amount: 0,
    amountHomeCurrency: 0,
  };

  const firstExpense = expenses[0];
  let largestAmount = firstExpense.amount;
  let largestAmountHomeCurrency: undefined | number = undefined;

  for (let i = 0; i < expenseCount; i++) {
    const expense = expenses[i];

    total.amount += expense.amount;

    if (expense.amount > largestAmount) {
      largestAmount = expense.amount;
    }

    const amountHome = expense.virtualData?.amountHomeCurrency;

    if (amountHome !== undefined) {
      total.amountHomeCurrency += amountHome;

      if (largestAmountHomeCurrency === undefined || amountHome > largestAmountHomeCurrency) {
        largestAmountHomeCurrency = amountHome;
      }
    }
  }

  const largest: MoneyValue = {
    amount: largestAmount,
    amountHomeCurrency: largestAmountHomeCurrency === undefined ? 0 : largestAmountHomeCurrency,
  };

  const average: MoneyValue = {
    amount: calculateAverage(total.amount, expenseCount),
    amountHomeCurrency: calculateAverage(total.amountHomeCurrency, expenseCount),
  };

  const share = calculateShare(total.amount, tripTotal);

  const expenseSummary: ExpenseSummary = {
    expenseCount,
    share,
    total,
    average,
    largest,
  };

  return expenseSummary;
}
