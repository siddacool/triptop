import type { Expense } from '$lib/features/expense/types';
import type { Category } from '$lib/features/expense/types/category';

export function categoryFilter(category: Category, expenses: Expense[]): Expense[] {
  const results: Expense[] = [];

  for (let i = 0, len = expenses.length; i < len; i++) {
    const expense = expenses[i];

    if (expense.category === category) {
      results.push(expense);
    }
  }

  return results;
}
