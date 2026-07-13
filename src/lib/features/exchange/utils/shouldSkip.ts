import type { Expense } from '$lib/features/expense/types';
import type { CurrencyCode } from '@flightlesslabs/currency';

export function shouldSkip(
  expenses: Expense[],
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
) {
  return tripCurrency === homeCurrency || expenses.length === 0;
}
