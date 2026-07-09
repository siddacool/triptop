import { createDate } from '$lib/helpers/date-time/createDate';
import type { Expense } from '../../../../../stores/expense/types';

export function dateFilter(
  minDate: string | undefined,
  maxDate: string | undefined,
  expenses: Expense[],
): Expense[] {
  if (!minDate && !maxDate) {
    return expenses;
  }

  const minDateKey = minDate ? Number(createDate(minDate).format('YYYYMMDD')) : undefined;
  const maxDateKey = maxDate ? Number(createDate(maxDate).format('YYYYMMDD')) : undefined;

  const results: Expense[] = [];

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const expenseDate = expense.virtualData?.filterFields?.date;

    if (expenseDate === undefined) {
      continue;
    }

    if (minDateKey !== undefined && expenseDate < minDateKey) {
      continue;
    }

    if (maxDateKey !== undefined && expenseDate > maxDateKey) {
      continue;
    }

    results.push(expense);
  }

  return results;
}
