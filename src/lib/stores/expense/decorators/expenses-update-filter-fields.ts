import type { Expense } from '../types';
import { updateFilterFields } from './update-filter-fields';

//  fields added to simplify search and other expense filters
export function expensesUpdateFilterFields(expenses: Expense[]): Expense[] {
  const result: Expense[] = [];

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const filterFields = updateFilterFields(expense);

    result.push({ ...expense, filterFields });
  }

  return result;
}
