import { describe, expect, it } from 'vitest';

import { convertCurrency } from './convert-currency';

describe('convertCurrency', () => {
  it('returns 0 when amount is 0', () => {
    expect(convertCurrency(0, 1.5)).toBe(0);
  });

  it('converts using the exchange rate', () => {
    expect(convertCurrency(100, 1.25)).toBe(125);
  });

  it('supports decimal amounts', () => {
    expect(convertCurrency(12.5, 2)).toBe(25);
  });

  it('supports decimal exchange rates', () => {
    expect(convertCurrency(100, 0.83)).toBe(83);
  });

  it('supports negative amounts', () => {
    expect(convertCurrency(-100, 1.25)).toBe(-125);
  });
});
