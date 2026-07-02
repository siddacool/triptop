import type { Expense } from '$lib/stores/expense/types';
import type { DateStats } from '../types';
import { createExpenseSummary } from './create-expense-summary';
import { groupExpensesByDate } from './group-expense-by-group';

export function createDateStats(expenses: Expense[], tripTotal: number): DateStats[] {
  const result: DateStats[] = [];

  const grouped = groupExpensesByDate(expenses);

  for (const [date, dateExpenses] of grouped) {
    const summary = createExpenseSummary(dateExpenses, tripTotal);

    if (!summary) {
      continue;
    }

    result.push({
      date,
      stats: summary,
    });
  }

  result.sort((a, b) => a.date.localeCompare(b.date));

  return result;
}
