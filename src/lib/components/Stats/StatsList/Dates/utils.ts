import { createDate } from '$lib/helpers/date-time/createDate';
import type { GroupStats } from '$lib/stores/stats/types';
import type { Dayjs } from 'dayjs';

export function transformDates(today: Dayjs, dateStats: GroupStats[]): GroupStats[] {
  const currentYear = today.year();

  let isAnyDateNotFromCurrentYear = false;

  const parsed = new Array<{
    stat: GroupStats;
    date: Dayjs;
  }>(dateStats.length);

  for (let i = 0; i < dateStats.length; i++) {
    const stat = dateStats[i];
    const date = createDate(stat.id);

    if (!isAnyDateNotFromCurrentYear && date.year() !== currentYear) {
      isAnyDateNotFromCurrentYear = true;
    }

    parsed[i] = { stat, date };
  }

  const format = isAnyDateNotFromCurrentYear ? 'MMM DD, YYYY' : 'MMM DD';

  const dates = new Array<GroupStats>(parsed.length);

  for (let i = 0; i < parsed.length; i++) {
    const { stat, date } = parsed[i];

    dates[i] = {
      ...stat,
      id: date.format(format),
    };
  }

  return dates;
}
