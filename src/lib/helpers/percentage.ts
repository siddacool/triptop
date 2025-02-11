/**
 * Calculates the percentage of a part relative to a whole.
 *
 * @param part The value representing the part.
 * @param whole The value representing the whole.
 * @returns The percentage as a number, or NaN if the input is invalid.
 */
export function calculatePercentage(part: number, whole: number): number {
  if (typeof part !== 'number' || typeof whole !== 'number') {
    return NaN; // Handle invalid input types
  }

  if (whole === 0) {
    return NaN; // Avoid division by zero
  }

  return (part / whole) * 100;
}

/**
 * Calculates the percentage change between two values.
 *
 * @param oldValue The original value.
 * @param newValue The new value.
 * @returns The percentage change as a number, or NaN if the input is invalid.
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (typeof oldValue !== 'number' || typeof newValue !== 'number') {
    return NaN; // Handle invalid input types
  }

  if (oldValue === 0) {
    return newValue === 0 ? 0 : Infinity * (newValue > 0 ? 1 : -1); // Handle division by zero, but return Infinity or -Infinity if new value is not zero
  }

  return ((newValue - oldValue) / oldValue) * 100;
}
