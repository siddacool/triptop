import dayjs, { type OptionType } from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export type DayjsValue = dayjs.Dayjs;

export type TimeValue = string | number | DayjsValue | Date | null | undefined;

export const getMoment = (time?: TimeValue, format?: OptionType) => dayjs(time, format);

export const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export function newDateStringToYearMonthDay(date: Date | null) {
  return date ? new Date(date)?.toISOString().split('T')[0] : undefined;
}

export const enum DateFormats {
  YEAR_FIRST_STANDARD = 'YYYY-MM-DD',
}
