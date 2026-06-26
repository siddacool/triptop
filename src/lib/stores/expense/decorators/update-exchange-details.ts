import { convertCurrency } from '$lib/helpers/convert-currency';
import type { CurrencyExchangeRate } from '$lib/stores/currency/types';
import type { Expense } from '../types';

//  fields added to simplify search and other expense filters
export function updateExchangeDetails(
  expense: Expense,
  exchangeRate: CurrencyExchangeRate | undefined,
): number | undefined {
  if (!exchangeRate || exchangeRate.exchangeRate === undefined) {
    return undefined;
  }

  const amountHomeCurrency = convertCurrency(expense.amount, exchangeRate?.exchangeRate);

  return amountHomeCurrency;
}
