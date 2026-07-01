import type { Dayjs } from 'dayjs';
import type { HistoricalCurrencyExchangeRateEntry } from '../../types';

export function isDateRangeCovered(
  expenseDate: Dayjs,
  nearest?: HistoricalCurrencyExchangeRateEntry,
) {
  if (!nearest) return false;

  const diff = expenseDate.diff(nearest.date, 'day');

  return diff >= 0 && diff <= 12;
}
