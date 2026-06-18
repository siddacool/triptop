import type { Expense } from '../types';

export function addSearchFields(expenses: Expense[]): Expense[] {
  const result: Expense[] = [];

  for (const expense of expenses) {
    result.push({
      ...expense,
      searchFields: {
        name: expense.name.trim().toLowerCase(),
      },
    });
  }

  return result;
}
