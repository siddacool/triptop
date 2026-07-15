<script lang="ts">
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import type { DateFormatMode } from '$lib/features/settings/types';
  import type { CurrencyCode } from '@flightlesslabs/currency';
  import ExchageDate from './ExchageDate.svelte';
  import RateCompare from './RateCompare.svelte';

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
    exchangeDate,
    exchangeRate,
    activeCurrency,
    dateFormat,
    tripCurrency,
    tripCurrencyLocale,
    homeCurrencyLocale,
    homeCurrency,
  }: Props = $props();

  const classes = $derived(['ExchangeInfo', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <ExchageDate {dateFormat} {exchangeDate} />
  <RateCompare
    {homeCurrencyLocale}
    {homeCurrency}
    {exchangeRate}
    {tripCurrency}
    {tripCurrencyLocale}
    {activeCurrency}
  />
</div>

<style lang="scss">
  .ExchangeInfo {
    display: flex;
    padding: calc(var(--dodo-ui-space) * 0.5);
    margin-bottom: calc(var(--dodo-ui-space) * 1);
    font-size: 0.85rem;
    color: var(--dodo-color-neutral-600);
    justify-content: flex-end;
    flex-wrap: wrap;
  }
</style>
