/**
 * Limits a string to a maximum number of characters.
 *
 * @param text - The input string.
 * @param maxLength - Maximum allowed length.
 * @returns The truncated string.
 */
export function limitCharacters(text: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error('maxLength must be greater than or equal to 0');
  }

  return text.length <= maxLength ? text : text.slice(0, maxLength);
}
