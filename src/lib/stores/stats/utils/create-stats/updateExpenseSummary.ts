import type { Expense } from '$lib/features/expense/types';
import type { ExpenseSummary } from '../../types';

export function updateExpenseSummary(summary: ExpenseSummary, expense: Expense) {
  summary.expenseCount++;

  summary.total.amount += expense.amount;

  if (summary.largest.amount === undefined) {
    summary.largest.amount = expense.amount;
  }

  if (summary.largest.expenseId === undefined) {
    summary.largest.expenseId = expense._id;
  }

  if (expense.amount > summary.largest.amount) {
    summary.largest.amount = expense.amount;
    summary.largest.expenseId = expense._id;
  }

  const amountHome = expense.virtualData?.amountHomeCurrency;

  if (amountHome !== undefined) {
    summary.total.amountHomeCurrency += amountHome;

    if (summary.largest.amountHomeCurrency === undefined) {
      summary.largest.amountHomeCurrency = amountHome;
    }

    summary.largest.amountHomeCurrency = Math.max(summary.largest.amountHomeCurrency, amountHome);
  }
}
