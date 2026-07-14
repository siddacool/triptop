<script lang="ts">
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import AmountsGadget from './AmountsGadget/AmountsGadget.svelte';

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
    homeCurrency,
    exchangeRate,
    activeCurrency = $bindable(),
    homeCurrencyLocale,
    tripCurrencyLocale,
    tripCurrency,
  }: Props = $props();

  const classes = $derived(['LiveCurrencyExchangeCalculator', className].filter(Boolean));
  const value = $state(0);
</script>

<div class={classes.join(' ')}>
  <AmountsGadget
    bind:activeCurrency
    amount={value}
    {homeCurrencyLocale}
    {homeCurrency}
    {exchangeRate}
    {tripCurrency}
    {tripCurrencyLocale}
  />
</div>

<style lang="scss">
  .LiveCurrencyExchangeCalculator {
    display: flex;
    flex-direction: column;
  }
</style>
