import { findNearestExchangeRate } from '$lib/helpers/find-nearest-exchange-rate';
import type { Dayjs } from 'dayjs';
import { isDateRangeCovered } from './isDateRangeCovered';
import type { HistoricalCurrencyExchangeRate } from '../../types';

export function needsExchangeRateUpdate(
  exchangeRate: HistoricalCurrencyExchangeRate | undefined,
  startDate: Dayjs,
  endDate: Dayjs,
) {
  if (!exchangeRate) {
    return true;
  }

  const nearestStart = findNearestExchangeRate(startDate.format('YYYY-MM-DD'), exchangeRate);

  const nearestEnd = findNearestExchangeRate(endDate.format('YYYY-MM-DD'), exchangeRate);

  if (isDateRangeCovered(startDate, nearestStart) && isDateRangeCovered(endDate, nearestEnd)) {
    return false;
  }

  return true;
}
