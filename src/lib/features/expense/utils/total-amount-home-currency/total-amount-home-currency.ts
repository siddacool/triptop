import type { Expense } from '../../types';

export function getTotalAmountHomeCurrency(expenses: Expense[]): number {
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
