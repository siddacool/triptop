import { describe, expect, it } from 'vitest';

import { searchFilter } from './searchFilter';
import { mockDataExpenses } from '../../../../features/expense/mocks/mock-data-expenses';
import { expensesListDecorator } from '../../decorators/list-decorator';

const expenses = expensesListDecorator(mockDataExpenses, undefined);

describe('searchFilter', () => {
  it('returns all expenses for an empty query', () => {
    expect(searchFilter('', expenses)).toEqual(expenses);
  });

  it('finds matching expenses', () => {
    const result = searchFilter('hotel', expenses);

    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('exp_002');
  });

  it('is case insensitive', () => {
    const lower = searchFilter('flight', expenses);
    const upper = searchFilter('FLIGHT', expenses);

    expect(upper).toEqual(lower);
  });

  it('returns an empty array when nothing matches', () => {
    expect(searchFilter('does-not-exist', expenses)).toEqual([]);
  });

  it('ignores surrounding whitespace', () => {
    expect(searchFilter('  hotel  ', expenses)).toEqual(searchFilter('hotel', expenses));
  });
});
