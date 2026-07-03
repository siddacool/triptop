import type { Expense } from '$lib/stores/expense/types';
import type { ExpenseSummary } from '../../types';

export function updateExpenseSummary(summary: ExpenseSummary, expense: Expense) {
  summary.expenseCount++;

  summary.total.amount += expense.amount;
  summary.largest.amount = Math.max(summary.largest.amount, expense.amount);

  const amountHome = expense.virtualData?.amountHomeCurrency;

  if (amountHome !== undefined) {
    summary.total.amountHomeCurrency += amountHome;
    summary.largest.amountHomeCurrency = Math.max(summary.largest.amountHomeCurrency, amountHome);
  }
}
