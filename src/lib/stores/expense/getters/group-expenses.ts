import type { Expense } from '$lib/stores/expense/types';

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

/**
 * Creates a flat, grouped list of expenses.
 *
 * Expenses are sorted by:
 * 1. Date (newest first)
 * 2. Creation time within each date (newest first)
 *
 * The returned array is intended for rendering in a single list:
 *
 * Group Header
 * ├── Expense
 * ├── Expense
 * Group Header
 * ├── Expense
 * └── Expense
 *
 * @param expenses - The expenses to group.
 * @returns A flat list of group headers and expense items.
 */
export function getExpenseGroupList(expenses: Expense[]): ExpenseGroup[] {
  // Create a sorted copy so the original array isn't modified.
  const sortedExpenses = [...expenses].sort((a, b) => {
    // Primary sort: date (descending).
    const dateComparison = (b.date ?? '').localeCompare(a.date ?? '');

    if (dateComparison !== 0) {
      return dateComparison;
    }

    // Secondary sort: newest expense first within the same date.
    return b.createdAt - a.createdAt;
  });

  const result: ExpenseGroup[] = [];
  let previousDate: string | undefined;

  for (const expense of sortedExpenses) {
    // Insert a group header when we encounter a new date.
    if (expense.date !== previousDate) {
      previousDate = expense.date;

      result.push({
        id: previousDate,
        type: 'group',
        date: previousDate,
      });
    }

    // Add the expense immediately after its group header.
    result.push({
      id: expense._id,
      type: 'expense',
      expense,
    });
  }

  return result;
}
