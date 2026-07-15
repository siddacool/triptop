<script lang="ts">
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import { dynamicCurrencyConverter } from '$lib/features/exchange/utils/dynamic-currency-converter';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    homeCurrency: CurrencyCode;
    activeCurrency: LiveCurrencyExchangeActiveCurrency;
    exchangeRate: number;
    homeCurrencyLocale: string | undefined;
    tripCurrency: CurrencyCode;
    tripCurrencyLocale: string | undefined;
  };

  let {
    class: className = '',
    exchangeRate,
    activeCurrency,
    tripCurrency,
    tripCurrencyLocale,
    homeCurrencyLocale,
    homeCurrency,
  }: Props = $props();

  const classes = $derived(['RateCompare', className].filter(Boolean));
  const tripCurrencyAmount = $derived(
    dynamicCurrencyConverter(
      LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
      activeCurrency,
      1,
      exchangeRate,
    ),
  );

  const homeCurrencyAmount = $derived(
    dynamicCurrencyConverter(
      LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY,
      activeCurrency,
      1,
      exchangeRate,
    ),
  );
</script>

<div class={classes.join(' ')}>
  ({#if activeCurrency === LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY}
    <Money
      value={1}
      currency={tripCurrency}
      locale={tripCurrencyLocale}
      options={{ maximumFractionDigits: 0 }}
    /> = <Money
      value={tripCurrencyAmount}
      currency={homeCurrency}
      locale={homeCurrencyLocale}
      options={{ maximumFractionDigits: 4 }}
    />
  {:else}
    <Money
      value={1}
      currency={homeCurrency}
      locale={homeCurrencyLocale}
      options={{ maximumFractionDigits: 0 }}
    /> = <Money
      value={homeCurrencyAmount}
      currency={tripCurrency}
      locale={tripCurrencyLocale}
      options={{ maximumFractionDigits: 4 }}
    />
  {/if})
</div>

<style lang="scss">
  .RateCompare {
    margin-left: 5px;
  }
</style>
