import type { DateFormatMode } from '$lib/features/settings/types';
import { createDate } from './date-time/createDate';

export function getDateFormatDate(date: string, dateFormat: DateFormatMode, clampToToday = false) {
  const targetDate = createDate(date);
  const now = createDate();

  if (clampToToday && targetDate.isAfter(now)) {
    return now.format(dateFormat);
  }

  return targetDate.format(dateFormat);
}
