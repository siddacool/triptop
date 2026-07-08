import { describe, expect, it } from 'vitest';

import { calculatePercentage } from './calculatePercentage';

describe('calculatePercentage', () => {
  it('returns 0 for 0', () => {
    expect(calculatePercentage(0)).toBe(0);
  });

  it('converts a decimal to a percentage', () => {
    expect(calculatePercentage(0.25)).toBe(25);
  });

  it('supports values greater than 1', () => {
    expect(calculatePercentage(1.5)).toBe(150);
  });

  it('supports negative values', () => {
    expect(calculatePercentage(-0.5)).toBe(-50);
  });
});
