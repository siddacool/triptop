import type { CurrencyCode } from '@flightlesslabs/currency';
import type { CurrencyExchangeRate } from '../types';

export function getCleanupCandidates(
  homeCurrency: CurrencyCode,
  currenciesUsed: CurrencyCode[],
  exchangeRates: CurrencyExchangeRate[],
) {
  const candidates: number[] = [];

  for (let i = 0; i < exchangeRates.length; i++) {
    const exchangeRate = exchangeRates[i];

    if (!exchangeRate.id) {
      continue;
    }

    if (
      exchangeRate.homeCurrency === homeCurrency &&
      currenciesUsed.includes(exchangeRate.tripCurrency)
    ) {
      continue;
    }

    candidates.push(exchangeRate.id);
  }

  return candidates;
}
