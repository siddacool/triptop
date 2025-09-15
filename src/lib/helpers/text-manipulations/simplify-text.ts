/**
 * Simplifies a given text by removing multiple spaces, emojis, and symbols.
 * Optionally replaces spaces with underscores.
 *
 * @param {string} text - The input text to be simplified.
 * @param {boolean} [replaceSpaces=false] - Optional parameter. If true, replaces spaces with underscores.
 * @returns {string} - The simplified text.
 *
 * @example
 * simplifyText("Hello   World! 😊", true); // Returns "Hello_World"
 * simplifyText("  This is a test  !!    "); // Returns "This is a test"
 */
export function simplifyText(text: string, replaceSpaces: boolean = false): string {
  // Regular expression to remove emojis and symbols
  const emojiAndSymbolRegex = /[\p{Emoji}\p{Symbol}\p{Punctuation}\p{Other}]/gu;

  // Remove multiple spaces and trim the string
  let cleanedText = text.replace(emojiAndSymbolRegex, '').replace(/\s+/g, ' ').trim();

  // Optionally replace spaces with underscores
  if (replaceSpaces) {
    cleanedText = cleanedText.replace(/\s/g, '_');
  }

  return cleanedText;
}
