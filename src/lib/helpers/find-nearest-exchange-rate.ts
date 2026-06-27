import type { HistoricalCurrencyExchangeRate } from '$lib/stores/currency/types';

export function findNearestExchangeRate(
  expenseDate: string,
  historicalExchangeRate: HistoricalCurrencyExchangeRate,
) {
  const { data } = historicalExchangeRate;

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].date <= expenseDate) {
      return data[i];
    }
  }

  return undefined;
}
