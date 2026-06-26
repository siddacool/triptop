import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// Extend dayjs with the required plugins
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(customParseFormatPlugin);
dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfYear);

// Export the type utility for use across the app
export type DayjsDateValue = string | number | dayjs.Dayjs | Date | null | undefined;

// Corrected default export
export const createDate = dayjs;
