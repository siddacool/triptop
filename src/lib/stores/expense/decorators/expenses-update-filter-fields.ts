import type { Expense } from '../types';
import { updateFilterFields } from './update-filter-fields';

//  fields added to simplify search and other expense filters
export function expensesUpdateFilterFields(expenses: Expense[]): Expense[] {
  const result: Expense[] = [];

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    let virtualData = expense.virtualData || {};
    const filterFields = updateFilterFields(expense);

    virtualData = {
      ...virtualData,
      filterFields,
    };

    result.push({ ...expense, virtualData });
  }

  return result;
}
