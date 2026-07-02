import type { Category } from '$lib/stores/category/types';
import type { Expense } from '$lib/stores/expense/types';

export function groupExpensesByCategory(expenses: Expense[]) {
  const result = new Map<Category, Expense[]>();

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    if (expense.archived) {
      continue;
    }

    if (!expense.category) {
      continue;
    }

    const group = result.get(expense.category);

    if (group) {
      group.push(expense);
    } else {
      result.set(expense.category, [expense]);
    }
  }

  return result;
}
