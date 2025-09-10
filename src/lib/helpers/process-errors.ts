/**
 * Processes an unknown error object and extracts **all error messages** in a normalized format.
 *
 * @template T - Expected structure of `error.response.data.errors`
 * @param {unknown} error - The error object thrown from API calls or other sources.
 * @returns {string[]} An array of extracted error messages.
 */
export function processErrors<T extends Record<string, string[]>>(error: unknown): string[] {
  if (!error) return [];

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const err = error as any;

  // Handle structured API errors
  if (err.response?.data?.errors) {
    const errors = err.response.data.errors as T | string[];

    // Case 1: Array of messages → ["Error1", "Error2"]
    if (Array.isArray(errors)) {
      return errors as string[];
    }

    // Case 2: Object of messages → { field: ["msg1"], field2: ["msg2"] }
    if (typeof errors === 'object') {
      return Object.values(errors).flat() as string[];
    }
  }

  // Handle plain JavaScript errors
  if (err.message && typeof err.message === 'string') {
    return [err.message];
  }

  // Fallback for unexpected error structures
  return ['An unexpected error occurred'];
}

/**
 * Processes an unknown error object and extracts **only the first error message**.
 *
 * @template T - Expected structure of `error.response.data.errors`
 * @param {unknown} error - The error object thrown from API calls or other sources.
 * @returns {string} The first extracted error message or a fallback.
 */
export function processFirstError<T extends Record<string, string[]>>(error: unknown): string {
  const errors = processErrors<T>(error);
  return errors.length > 0 ? errors[0] : 'An unexpected error occurred';
}
