import type { Category } from '$lib/stores/category/types';
import type { Expense } from '../../types';

export function categoryFilter(category: Category, expenses: Expense[]): Expense[] {
  const results: Expense[] = [];

  for (const expense of expenses) {
    if (expense.category === category) {
      results.push(expense);
    }
  }

  return results;
}
