import type { Expense } from '$lib/stores/expense/types';
import type { CategoryStats } from '../types';
import { createExpenseSummary } from './create-expense-summary';
import { groupExpensesByCategory } from './group-expenses-by-category';

export function createCategoryStats(expenses: Expense[], tripTotal: number): CategoryStats[] {
  const result: CategoryStats[] = [];
  const groupExpenses = groupExpensesByCategory(expenses);

  for (const [category, expenses] of groupExpenses) {
    const summary = createExpenseSummary(expenses, tripTotal);

    if (!summary) {
      continue;
    }

    result.push({
      name: category,
      stats: summary,
    });
  }

  return result;
}
