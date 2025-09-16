/**
 * Cleans up extra spaces in a given string:
 * - Trims leading and trailing whitespace.
 * - Replaces multiple consecutive spaces with a single space.
 *
 * @param text - The input string to clean.
 * @returns A new string with normalized spacing.
 */
export function normalizeSpaces(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}
