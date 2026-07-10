import { convertCurrency } from '$lib/utils/convert-currency/convert-currency';
import { findNearestExchangeRate } from '$lib/features/exchange/utils/find-nearest-exchange-rate/find-nearest-exchange-rate';
import type { Expense } from '../../types';
import type { CurrencyExchangeRate } from '$lib/features/exchange/types';

//  fields added to simplify search and other expense filters
export function updateExchangeDetails(
  expense: Expense,
  exchangeRate: CurrencyExchangeRate | undefined,
): number | undefined {
  if (!exchangeRate) {
    return undefined;
  }

  const bestRate = findNearestExchangeRate(expense.date, exchangeRate);

  if (!bestRate?.exchangeRate) {
    return undefined;
  }

  const amountHomeCurrency = convertCurrency(expense.amount, bestRate?.exchangeRate);

  return amountHomeCurrency;
}
