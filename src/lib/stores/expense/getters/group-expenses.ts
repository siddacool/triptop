import type { Expense } from '$lib/stores/expense/types';

export type ExpensesDateGroup = {
  date: string;
  expenses: Expense[];
};

/**
 * Groups expenses by their date and sorts them in descending date order.
 *
 * The returned array contains one entry per unique date, with all expenses
 * belonging to that date grouped together.
 *
 * @param expenses - List of expenses to group.
 * @returns An array of date groups sorted by date (newest first).
 *
 * @example
 * const expenses = [
 *   { id: '1', date: '2025-06-15', amount: 100 },
 *   { id: '2', date: '2025-06-14', amount: 50 },
 *   { id: '3', date: '2025-06-15', amount: 25 },
 * ];
 *
 * getGroupExpenses(expenses);
 *
 * // Result:
 * // [
 * //   {
 * //     date: '2025-06-15',
 * //     expenses: [
 * //       { id: '1', date: '2025-06-15', amount: 100 },
 * //       { id: '3', date: '2025-06-15', amount: 25 }
 * //     ]
 * //   },
 * //   {
 * //     date: '2025-06-14',
 * //     expenses: [
 * //       { id: '2', date: '2025-06-14', amount: 50 }
 * //     ]
 * //   }
 * // ]
 */
export function getGroupExpenses(expenses: Expense[]): ExpensesDateGroup[] {
  const groupedExpenses = new Map<string, Expense[]>();

  const sortedExpenses = [...expenses]
    .sort((a, b) => b?.createdAt - a?.createdAt)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  for (const expense of sortedExpenses) {
    const date = expense.date;

    if (!groupedExpenses.has(date)) {
      groupedExpenses.set(date, []);
    }

    groupedExpenses.get(date)!.push(expense);
  }

  return Array.from(groupedExpenses.entries(), ([date, expenses]) => ({
    date,
    expenses,
  }));
}
