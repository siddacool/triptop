import type { Expense } from '$lib/features/expense/types';

/**
 * A date group header displayed before the expenses for a given day.
 */
export type ExpenseGroupHeader = {
  /**
   * Unique identifier for the group.
   * Uses the group's date (`YYYY-MM-DD`).
   */
  id: string;
  type: 'group';
  date: string;
};

/**
 * An expense entry belonging to a date group.
 */
export type ExpenseGroupExpense = {
  /**
   * Unique identifier for the expense.
   * Uses the expense's `_id`.
   */
  id: string;
  type: 'expense';
  expense: Expense;
};

/**
 * A single item in the grouped expense list.
 *
 * Each date group is followed by all expenses for that date.
 */
export type ExpenseGroup = ExpenseGroupHeader | ExpenseGroupExpense;

export function getExpenseGroupList(expenses: Expense[]): ExpenseGroup[] {
  const result: ExpenseGroup[] = [];
  let previousDate = '';

  for (let i = 0, len = expenses.length; i < len; i++) {
    const expense = expenses[i];
    const date = expense.date;

    if (date !== previousDate) {
      previousDate = date;

      result.push({
        id: date,
        type: 'group',
        date,
      });
    }

    result.push({
      id: expense._id,
      type: 'expense',
      expense,
    });
  }

  return result;
}
