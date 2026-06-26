import type { Expense } from '../types';

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

    if (expense.virtualData?.amountHomeCurrency && !expense.archived) {
      total += expense.virtualData?.amountHomeCurrency;
    }
  }

  return total;
}
