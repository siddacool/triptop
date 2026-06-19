import { createDate } from '@flightlesslabs/time-utils';
import type { Expense } from '../../types';

export function maxDateFilter(maxDate: string, expenses: Expense[]): Expense[] {
  const results: Expense[] = [];
  const maxDateMoment = createDate(maxDate);

  if (!maxDateMoment.isValid()) {
    return expenses;
  }

  for (const expense of expenses) {
    const date = expense.searchFields?.date;

    if (!date) {
      continue;
    }

    if (date.isBefore(maxDateMoment) || date.isSame(maxDateMoment)) {
      results.push(expense);
    }
  }

  return results;
}
