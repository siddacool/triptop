/**
 * Removes all non-numeric characters except:
 * - minus sign (-)
 * - decimal point (.)
 *
 * Returns:
 * - number if valid
 * - null for null, undefined, empty, or invalid values
 */
export function parseNumeric(value: string | null | undefined): number | null {
  if (value == null || value.trim() === '') {
    return null;
  }

  const cleaned = value
    .replace(/,/g, '') // remove commas
    .replace(/[^\d.-]/g, ''); // keep digits, minus, decimal

  if (cleaned === '' || cleaned === '-' || cleaned === '.') {
    return null;
  }

  const num = Number(cleaned);

  return Number.isNaN(num) ? null : num;
}
