import type { Expense } from '$lib/features/expense/types';

export function getExpensesTotal(expenses: Expense[]): number {
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    if (!expense.archived) {
      total += expense.amount;
    }
  }

  return total;
}

export function getExpensesTotalAmountHomeCurrency(expenses: Expense[]): number {
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const amountHome = expense.virtualData?.amountHomeCurrency;

    if (amountHome !== undefined) {
      total += amountHome;
    }
  }

  return total;
}
