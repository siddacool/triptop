import { createDate } from '$lib/utils/date-time/createDate';
import { LIVE_EXCHANGE_RATE_DIFFERENCE } from '../const';

export function checkLiveRateStale(requestedAt: number | undefined) {
  if (!requestedAt) {
    return true;
  }

  const now = createDate();

  return now.diff(requestedAt, 'hour', true) >= LIVE_EXCHANGE_RATE_DIFFERENCE;
}
