import type { Expense } from '../types';
import { updateFilterFields } from './update-filter-fields';
import type { CurrencyExchangeRate } from '$lib/stores/currency/types';
import { updateExchangeDetails } from './update-exchange-details';

export type ExpenseDecoratorConfig = {
  exchangeRate: CurrencyExchangeRate | undefined;
};

export function expenseDecorator(expense: Expense, config: ExpenseDecoratorConfig): Expense {
  const newExpense = {
    ...expense,
  };

  const filterFields = updateFilterFields(expense);
  const amountHomeCurrency = updateExchangeDetails(expense, config.exchangeRate);

  newExpense.virtualData = {
    ...newExpense.virtualData,
    filterFields,
    amountHomeCurrency,
  };

  return newExpense;
}
