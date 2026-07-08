import { describe, expect, it } from 'vitest';

import { getExpensesTotal, getExpensesTotalAmountHomeCurrency } from './total-expenses';
import { mockDataExpenses } from '../data/mock-data-expenses';

describe('getExpensesTotal', () => {
  it('returns 0 for an empty array', () => {
    expect(getExpensesTotal([])).toBe(0);
  });

  it('sums all non-archived expenses', () => {
    expect(getExpensesTotal(mockDataExpenses)).toBe(
      mockDataExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    );
  });

  it('ignores archived expenses', () => {
    const expenses = [
      { ...mockDataExpenses[0], amount: 100, archived: false },
      { ...mockDataExpenses[1], amount: 200, archived: true },
      { ...mockDataExpenses[2], amount: 300, archived: false },
    ];

    expect(getExpensesTotal(expenses)).toBe(400);
  });
});

describe('getExpensesTotalAmountHomeCurrency', () => {
  it('returns 0 for an empty array', () => {
    expect(getExpensesTotalAmountHomeCurrency([])).toBe(0);
  });

  it('sums home currency amounts', () => {
    const expenses = [
      {
        ...mockDataExpenses[0],
        virtualData: { amountHomeCurrency: 100 },
      },
      {
        ...mockDataExpenses[1],
        virtualData: { amountHomeCurrency: 250 },
      },
      {
        ...mockDataExpenses[2],
      },
    ];

    expect(getExpensesTotalAmountHomeCurrency(expenses)).toBe(350);
  });

  it('ignores expenses without a home currency amount', () => {
    expect(getExpensesTotalAmountHomeCurrency(mockDataExpenses)).toBe(0);
  });
});
