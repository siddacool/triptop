import type { CurrencyExchangeRate } from '$lib/features/exchange/types';
import type { Expense } from '../../types';
import { updateExchangeDetails } from './update-exchange-details';
import { updateFilterFields } from './update-filter-fields';

export function expensesListDecorator(
  expenses: Expense[],
  exchangeRate: CurrencyExchangeRate | undefined,
): Expense[] {
  const result: Expense[] = [];

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    let virtualData = expense.virtualData || {};
    const filterFields = updateFilterFields(expense);
    const amountHomeCurrency = updateExchangeDetails(expense, exchangeRate);

    virtualData = {
      ...virtualData,
      filterFields,
      amountHomeCurrency,
    };

    result.push({ ...expense, virtualData });
  }

  return result;
}
