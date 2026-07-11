import { describe, expect, it } from 'vitest';

import { dateFilter } from './dateFilter';
import { expensesListDecorator } from '../../decorators/list-decorator';
import { mockDataExpenses } from '$lib/features/expense/mocks/mock-data-expenses';

const expenses = expensesListDecorator(mockDataExpenses, undefined);

describe('dateFilter', () => {
  it('returns all expenses when no date range is provided', () => {
    expect(dateFilter(undefined, undefined, expenses)).toEqual(expenses);
  });

  it('filters by minimum date', () => {
    const result = dateFilter('2026-06-20', undefined, expenses);

    expect(result.every((expense) => expense.date >= '2026-06-20')).toBe(true);
  });

  it('filters by maximum date', () => {
    const result = dateFilter(undefined, '2026-06-17', expenses);

    expect(result.every((expense) => expense.date <= '2026-06-17')).toBe(true);
  });

  it('filters by date range', () => {
    const result = dateFilter('2026-06-17', '2026-06-19', expenses);

    expect(
      result.every((expense) => expense.date >= '2026-06-17' && expense.date <= '2026-06-19'),
    ).toBe(true);
  });

  it('returns an empty array when no expenses match', () => {
    expect(dateFilter('2030-01-01', '2030-12-31', expenses)).toEqual([]);
  });
});
