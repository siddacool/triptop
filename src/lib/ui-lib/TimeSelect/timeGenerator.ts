import type { SelectOption } from '../Select/Select.svelte';

/**
 * Generates an array of number options between `min` and `max` (inclusive).
 * Both value and label are strings. Labels are always zero-padded to 2 digits (e.g., "01", "09", "59").
 * The maximum allowed value is 99.
 *
 * @param {number} [min=0] - The starting number (minimum 0).
 * @param {number} [max=99] - The ending number (maximum 99).
 * @returns {SelectOption[]} - Array of option objects.
 *
 * @example
 * generatePaddedNumberOptions(1, 12);
 * // [{ value: "01", label: "01" }, ..., { value: "12", label: "12" }]
 *
 * @example
 * generatePaddedNumberOptions(0, 59);
 * // [{ value: "00", label: "00" }, ..., { value: "59", label: "59" }]
 */
export function generatePaddedNumberOptions(min: number = 0, max: number = 99): SelectOption[] {
  if (max > 99) {
    throw new Error('Max value cannot exceed 99');
  }

  return Array.from({ length: max - min + 1 }, (_, i) => {
    const num = min + i;
    const str = num.toString().padStart(2, '0');
    return { value: `${num}`, label: str };
  });
}

/**
 * Represents a time in 12-hour format.
 */
export interface TwelveHourTime {
  /** Hour in 12-hour format as string (1–12) */
  hour: string;
  /** Period, either "AM" or "PM" */
  period: string;
}

/**
 * Converts a 24-hour numerical value to a 12-hour format object.
 *
 * @param {number} hour24 - The hour in 24-hour format (0–23).
 * @returns {TwelveHourTime} - Object containing the 12-hour `hour` and `period`.
 *
 * @example
 * convert24To12HourObj(0);  // { hour: "12", period: "AM" }
 * convert24To12HourObj(9);  // { hour: "9", period: "AM" }
 * convert24To12HourObj(12); // { hour: "12", period: "PM" }
 * convert24To12HourObj(23); // { hour: "11", period: "PM" }
 */
export function convert24To12HourObj(hour24: number): TwelveHourTime {
  if (hour24 < 0 || hour24 > 23) {
    throw new Error('Hour must be between 0 and 23');
  }

  const period: 'AM' | 'PM' = hour24 < 12 ? 'AM' : 'PM';
  const hour = (hour24 % 12 === 0 ? 12 : hour24 % 12).toString();

  return { hour, period };
}

/**
 * Converts a 12-hour time object back to a 24-hour numerical value.
 *
 * @param {TwelveHourTime} time - The 12-hour time object.
 * @returns {number} The hour in 24-hour format (0–23).
 *
 * @example
 * convert12To24Hour({ hour: "12", period: "AM" }); // 0
 * convert12To24Hour({ hour: "1", period: "AM" });  // 1
 * convert12To24Hour({ hour: "12", period: "PM" }); // 12
 * convert12To24Hour({ hour: "3", period: "PM" });  // 15
 */
export function convert12To24Hour(time: TwelveHourTime): number {
  const hourNum = parseInt(time.hour, 10);

  if (hourNum < 1 || hourNum > 12) {
    throw new Error('Hour must be between 1 and 12');
  }

  if (time.period === 'AM') {
    return hourNum === 12 ? 0 : hourNum;
  } else {
    // PM
    return hourNum === 12 ? 12 : hourNum + 12;
  }
}
