import type { CurrencyExchangeRate } from '../types';
import { createDate } from '$lib/utils/date-time/createDate';
import { LIVE_EXCHANGE_RATE_DIFFERENCE } from '../const';

export function needsLiveExchangeRateUpdate(exchangeRate: CurrencyExchangeRate | undefined) {
  if (!exchangeRate) {
    return true;
  }

  const date = exchangeRate?.data?.[0]?.date;

  if (!date) {
    return true;
  }

  const lastUpdated = createDate(date);
  const now = createDate();

  return now.diff(lastUpdated, 'hour', true) >= LIVE_EXCHANGE_RATE_DIFFERENCE;
}
