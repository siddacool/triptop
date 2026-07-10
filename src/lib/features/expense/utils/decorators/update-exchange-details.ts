import { convertCurrency } from '$lib/helpers/convert-currency';
import { findNearestExchangeRate } from '$lib/helpers/find-nearest-exchange-rate';
import type { HistoricalCurrencyExchangeRate } from '$lib/stores/currency/types';
import type { Expense } from '../../types';

//  fields added to simplify search and other expense filters
export function updateExchangeDetails(
  expense: Expense,
  exchangeRate: HistoricalCurrencyExchangeRate | undefined,
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
