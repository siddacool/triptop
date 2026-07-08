import type { Expense } from '../../types';

export function searchFilter(query: string, expenses: Expense[]): Expense[] {
  const search = query.trim().toLowerCase();

  if (!search) {
    return expenses;
  }

  const results: Expense[] = [];

  for (let i = 0, len = expenses.length; i < len; i++) {
    const expense = expenses[i];

    if (expense.virtualData?.filterFields?.name.includes(search)) {
      results.push(expense);
    }
  }

  return results;
}
