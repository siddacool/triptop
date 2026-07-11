import { describe, expect, it } from 'vitest';

import { getExpenseGroupList } from './group-expenses';
import { mockDataExpenses } from '../../mocks/mock-data-expenses';

const expenses = [...mockDataExpenses].sort(
  (a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt,
);

describe('getExpenseGroupList', () => {
  it('returns an empty array', () => {
    expect(getExpenseGroupList([])).toEqual([]);
  });

  it('groups expenses by date', () => {
    const result = getExpenseGroupList(expenses);

    expect(result.filter((i) => i.type === 'group')).toHaveLength(9);
    expect(result[0]).toEqual({
      id: '2026-06-22',
      type: 'group',
      date: '2026-06-22',
    });
    expect(result.at(-2)).toEqual({
      id: '2024-06-23',
      type: 'group',
      date: '2024-06-23',
    });
    expect(result).toHaveLength(expenses.length + 9);
  });
});
