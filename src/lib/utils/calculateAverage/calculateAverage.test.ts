import { describe, expect, it } from 'vitest';

import { calculateAverage } from './calculateAverage';

describe('calculateAverage', () => {
  it('returns 0 when count is 0', () => {
    expect(calculateAverage(100, 0)).toBe(0);
  });

  it('calculates the average', () => {
    expect(calculateAverage(100, 4)).toBe(25);
  });

  it('supports decimal averages', () => {
    expect(calculateAverage(10, 3)).toBeCloseTo(3.3333333333);
  });

  it('returns 0 when total is 0', () => {
    expect(calculateAverage(0, 5)).toBe(0);
  });
});
