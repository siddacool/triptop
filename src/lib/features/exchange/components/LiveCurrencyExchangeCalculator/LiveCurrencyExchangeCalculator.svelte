<script lang="ts">
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import DisplayGadget from './DisplayGadget/DisplayGadget.svelte';
  import EditGadget from './EditGadget/EditGadget.svelte';
  import type { DateFormatMode } from '$lib/features/settings/types';
  import ExchangeInfo from './ExchangeInfo/ExchangeInfo.svelte';

  type Props = {
    class?: string;
    homeCurrency: CurrencyCode;
    activeCurrency: LiveCurrencyExchangeActiveCurrency;
    exchangeRate: number;
    homeCurrencyLocale: string | undefined;
    tripCurrency: CurrencyCode;
    tripCurrencyLocale: string | undefined;
    exchangeDate: string;
    dateFormat: DateFormatMode;
  };

  let {
    class: className = '',
    homeCurrency,
    exchangeRate,
    activeCurrency = $bindable(),
    homeCurrencyLocale,
    tripCurrencyLocale,
    tripCurrency,
    exchangeDate,
    dateFormat,
  }: Props = $props();

  const classes = $derived(['LiveCurrencyExchangeCalculator', className].filter(Boolean));
  let value = $state('0');
</script>

<div class={classes.join(' ')}>
  <DisplayGadget
    bind:activeCurrency
    amount={value}
    {homeCurrencyLocale}
    {homeCurrency}
    {exchangeRate}
    {tripCurrency}
    {tripCurrencyLocale}
  />
  <ExchangeInfo
    {exchangeDate}
    {dateFormat}
    {homeCurrencyLocale}
    {homeCurrency}
    {exchangeRate}
    {tripCurrency}
    {tripCurrencyLocale}
    {activeCurrency}
  />
  <EditGadget bind:amount={value} />
</div>

<style lang="scss">
  .LiveCurrencyExchangeCalculator {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
