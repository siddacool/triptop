import type { Expense } from '../types';
import { updateFilterFields } from './update-filter-fields';
import type { CurrencyExchangeRate } from '$lib/stores/currency/types';
import { updateExchangeDetails } from './update-exchange-details';

export type ExpensesListDecoratorConfig = {
  exchangeRate: CurrencyExchangeRate | undefined;
};

export function expensesListDecorator(
  expenses: Expense[],
  config: ExpensesListDecoratorConfig,
): Expense[] {
  const result: Expense[] = [];

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    let virtualData = expense.virtualData || {};
    const filterFields = updateFilterFields(expense);
    const amountHomeCurrency = updateExchangeDetails(expense, config.exchangeRate);

    virtualData = {
      ...virtualData,
      filterFields,
      amountHomeCurrency,
    };

    result.push({ ...expense, virtualData });
  }

  return result;
}
