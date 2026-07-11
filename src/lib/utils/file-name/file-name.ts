import { limitCharacters } from '../limit-characters/limit-characters';

/**
 * Converts a string into a filename-safe format.
 *
 * @param text - Input text.
 * @param maxLength - Optional maximum filename length.
 * @returns A filename-safe string.
 */
export function toSafeFilename(text: string, maxLength?: number): string {
  let filename = [...text]
    .filter((char) => {
      const code = char.charCodeAt(0);

      // Remove control characters
      if (code < 32) {
        return false;
      }

      // Remove invalid filename characters
      return !/[<>:"/\\|?*]/.test(char);
    })
    .join('')
    .replace(/[. ]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (maxLength !== undefined) {
    filename = limitCharacters(filename, maxLength);
  }

  return filename;
}
