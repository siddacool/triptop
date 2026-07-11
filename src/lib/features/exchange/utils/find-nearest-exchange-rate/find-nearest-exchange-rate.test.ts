import { describe, expect, it } from 'vitest';

import { findNearestExchangeRate } from './find-nearest-exchange-rate';
import type { CurrencyExchangeRate } from '../../types';

const historicalExchangeRate: CurrencyExchangeRate = {
  homeCurrency: 'USD',
  tripCurrency: 'EUR',
  requestedAt: 0,
  data: [
    { date: '2026-06-15', exchangeRate: 1.1 },
    { date: '2026-06-18', exchangeRate: 1.2 },
    { date: '2026-06-21', exchangeRate: 1.3 },
  ],
};

describe('findNearestExchangeRate', () => {
  it('returns an exact date match', () => {
    expect(findNearestExchangeRate('2026-06-18', historicalExchangeRate)).toEqual({
      date: '2026-06-18',
      exchangeRate: 1.2,
    });
  });

  it('returns the nearest earlier exchange rate', () => {
    expect(findNearestExchangeRate('2026-06-20', historicalExchangeRate)).toEqual({
      date: '2026-06-18',
      exchangeRate: 1.2,
    });
  });

  it('returns the latest exchange rate when the expense is after all entries', () => {
    expect(findNearestExchangeRate('2026-06-30', historicalExchangeRate)).toEqual({
      date: '2026-06-21',
      exchangeRate: 1.3,
    });
  });

  it('returns undefined when the expense is before all entries', () => {
    expect(findNearestExchangeRate('2026-06-01', historicalExchangeRate)).toBeUndefined();
  });

  it('returns undefined when there are no exchange rates', () => {
    expect(
      findNearestExchangeRate('2026-06-18', {
        ...historicalExchangeRate,
        data: [],
      }),
    ).toBeUndefined();
  });
});
