import type { Dayjs } from 'dayjs';
import type { DateExchangeRate } from '../types';

export function isDateRangeCovered(expenseDate: Dayjs, nearest?: DateExchangeRate) {
  if (!nearest) return false;

  const diff = expenseDate.diff(nearest.date, 'day');

  return diff >= 0 && diff <= 12;
}
