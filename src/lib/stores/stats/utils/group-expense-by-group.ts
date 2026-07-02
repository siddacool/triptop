import type { Expense } from '$lib/stores/expense/types';

export function groupExpensesByDate(expenses: Expense[]) {
  const result = new Map<string, Expense[]>();

  for (const expense of expenses) {
    if (expense.archived) continue;

    const group = result.get(expense.date);

    if (group) {
      group.push(expense);
    } else {
      result.set(expense.date, [expense]);
    }
  }

  return result;
}
