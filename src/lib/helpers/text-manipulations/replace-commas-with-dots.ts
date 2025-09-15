/**
 * Replaces all commas in a given string with dots.
 * Useful for formatting CSV data where decimal points are needed.
 *
 * @param {string} input - The input string containing commas.
 * @returns {string} - The modified string with commas replaced by dots.
 */
export function replaceCommasWithDots(input: string): string {
  return input.replace(/,/g, '.');
}
