import type { ExpenseSummary } from '../../types';

export function defaultExpenseSummary(): ExpenseSummary {
  return {
    expenseCount: 0,
    share: 0,
    total: {
      amount: 0,
      amountHomeCurrency: 0,
    },
    average: {
      amount: 0,
      amountHomeCurrency: 0,
    },
    largest: {
      amount: 0,
      amountHomeCurrency: 0,
    },
  };
}
