import type { Expense } from '$lib/features/expense/types';
import { createDate } from '$lib/utils/date-time/createDate';

export function getExpenseDateRange(expenses: Expense[]) {
  return {
    start: createDate(expenses[0].date),
    end: createDate(expenses.at(-1)!.date),
  };
}
