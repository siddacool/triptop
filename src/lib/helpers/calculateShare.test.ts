import { describe, expect, it } from 'vitest';

import { calculateShare } from './calculateShare';

describe('calculateShare', () => {
  it('returns 0 when total is 0', () => {
    expect(calculateShare(100, 0)).toBe(0);
  });

  it('calculates the share', () => {
    expect(calculateShare(25, 100)).toBe(0.25);
  });

  it('returns 0 when amount is 0', () => {
    expect(calculateShare(0, 100)).toBe(0);
  });

  it('supports values greater than the total', () => {
    expect(calculateShare(150, 100)).toBe(1.5);
  });

  it('supports decimal values', () => {
    expect(calculateShare(1, 3)).toBeCloseTo(0.3333333333);
  });
});
