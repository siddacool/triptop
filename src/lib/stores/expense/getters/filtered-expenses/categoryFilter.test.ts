import { describe, expect, it } from 'vitest';

import { Category } from '$lib/stores/category/types';
import { categoryFilter } from './categoryFilter';
import { mockDataExpenses } from '../../data/mock-data-expenses';

describe('categoryFilter', () => {
  it('returns an empty array when given no expenses', () => {
    expect(categoryFilter(Category.FOOD, [])).toEqual([]);
  });

  it('returns only expenses in the requested category', () => {
    const result = categoryFilter(Category.FOOD, mockDataExpenses);

    expect(result).toHaveLength(3);
    expect(result.every((expense) => expense.category === Category.FOOD)).toBe(true);
  });

  it('returns an empty array when no expenses match', () => {
    expect(categoryFilter('INVALID' as Category, mockDataExpenses)).toEqual([]);
  });

  it('preserves the original order', () => {
    const result = categoryFilter(Category.FOOD, mockDataExpenses);

    expect(result.map((expense) => expense._id)).toEqual(['exp_005', 'exp_007', 'exp_012']);
  });
});
