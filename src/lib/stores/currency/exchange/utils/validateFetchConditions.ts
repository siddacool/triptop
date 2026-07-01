import type { Expense } from '$lib/stores/expense/types';
import type { CurrencyCode } from '@flightlesslabs/currency';

export function validateFetchConditions(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  expenses: Expense[] | undefined,
) {
  if (tripCurrency === homeCurrency) {
    return false;
  }

  if (!expenses?.length) {
    return false;
  }

  return true;
}
