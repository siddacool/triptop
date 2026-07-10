import type { Expense } from '$lib/features/expense/types';
import type { CurrencyCode } from '@flightlesslabs/currency';
import { needsExchangeRateUpdate } from '../utils/needsExchangeRateUpdate';
import type { Dayjs } from 'dayjs';
import type { CurrencyExchangeRate } from '../types';

export function validateFetchConditions(
  tripCurrency: CurrencyCode,
  homeCurrency: CurrencyCode,
  expenses: Expense[] | undefined,
) {
  if (tripCurrency === homeCurrency) {
    throw new Error('tripCurrency and homeCurrency are same');
  }

  if (!expenses?.length) {
    throw new Error('No expenses');
  }
}

export function validateIfUpdateNeeded(
  startDate: Dayjs,
  endDate: Dayjs,
  exchangeRate: CurrencyExchangeRate | undefined,
) {
  const isUpdateNeeded = needsExchangeRateUpdate(exchangeRate, startDate, endDate);

  if (!isUpdateNeeded) {
    console.log('debug: range already present, no update needed', exchangeRate);

    throw new Error('Update not needed');
  }
}
