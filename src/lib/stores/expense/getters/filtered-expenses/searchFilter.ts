import type { Expense } from '../../types';

export function searchFilter(query: string, expenses: Expense[]): Expense[] {
  const search = query.trim().toLowerCase();

  const results: Expense[] = [];

  for (const expense of expenses) {
    if (expense?.virtualData?.filterFields?.name.includes(search)) {
      results.push(expense);
    }
  }

  return results;
}
