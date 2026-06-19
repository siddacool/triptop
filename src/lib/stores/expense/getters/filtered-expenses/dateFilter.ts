import { createDate } from '@flightlesslabs/time-utils';
import type { Expense } from '../../types';

export function dateFilter(minDate: string, maxDate: string, expenses: Expense[]): Expense[] {
  const results: Expense[] = [];
  const minDateMoment = createDate(minDate);
  const maxDateMoment = createDate(maxDate);

  if (!minDateMoment.isValid() || !maxDateMoment.isValid()) {
    return expenses;
  }

  for (const expense of expenses) {
    const date = expense.searchFields?.date;

    if (!date) {
      continue;
    }

    const minDateMatch = date.isAfter(minDateMoment) || date.isSame(minDate);
    const maxDateMatch = date.isBefore(maxDateMoment) || date.isSame(maxDateMoment);

    if (minDateMatch && maxDateMatch) {
      results.push(expense);
    }
  }

  return results;
}
