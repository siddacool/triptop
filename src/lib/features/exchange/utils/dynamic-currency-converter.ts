import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
import { convertCurrency } from '$lib/utils/convert-currency/convert-currency';

export function dynamicCurrencyConverter(
  type: LiveCurrencyExchangeActiveCurrency,
  activeCurrency: LiveCurrencyExchangeActiveCurrency,
  amount: number,
  exchangeRate: number,
) {
  if (amount === 0) {
    return 0;
  }

  if (
    type === LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY &&
    activeCurrency === LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY
  ) {
    return convertCurrency(amount, exchangeRate);
  } else if (
    type === LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY &&
    activeCurrency === LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY
  ) {
    return amount / exchangeRate;
  } else {
    return amount;
  }
}
