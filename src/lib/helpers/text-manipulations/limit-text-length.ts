/**
 * Limits the length of a text string to a specified number of characters.
 *
 * This function takes a text string and an optional maximum character limit as input and returns a new string that is limited to the specified number of characters. If the original string is longer than the limit, the returned string will be truncated and an ellipsis ("...") will be added to the end.
 *
 * @param {string} text - The text string to be limited.
 * @param {number} maxLength - The maximum number of characters allowed in the returned string. Default value is 25.
 * @returns {string} The limited text string.
 */
export function limitTextLength(text: string, maxLength: number = 22): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}
