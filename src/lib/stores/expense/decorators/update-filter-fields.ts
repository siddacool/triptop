import { createDate } from '@flightlesslabs/time-utils';
import type { Expense, ExpenseFilterFields } from '../types';

//  fields added to simplify search and other expense filters
export function updateFilterFields(expense: Expense): ExpenseFilterFields {
  const result: ExpenseFilterFields = {
    name: expense.name.trim().toLowerCase(),
    date: Number(createDate(expense.date, 'YYYY-MM-DD').format('YYYYMMDD')),
  };

  console.log(
    'debug:',
    expense.date,
    Number(createDate(expense.date, 'YYYY-MM-DD').format('YYYYMMDD')),
  );

  return result;
}
