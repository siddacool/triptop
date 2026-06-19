import { createDate } from '@flightlesslabs/time-utils';
import type { Expense } from '../../types';

export function minDateFilter(minDate: string, expenses: Expense[]): Expense[] {
  const results: Expense[] = [];
  const minDateMoment = createDate(minDate);

  if (!minDateMoment.isValid()) {
    return expenses;
  }

  for (const expense of expenses) {
    const date = expense.searchFields?.date;

    if (!date) {
      continue;
    }

    if (date.isAfter(minDateMoment) || date.isSame(minDate)) {
      results.push(expense);
    }
  }

  return results;
}
