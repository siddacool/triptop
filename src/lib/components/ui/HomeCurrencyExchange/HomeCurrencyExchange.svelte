<script lang="ts">
  import ExchangeAmount from '../ExchangeAmount/ExchangeAmount.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useCurrencyExchangeStore } from '$lib/stores/currency/exchange.svelte';

  type Props = {
    class?: string;
    amount: number;
  };

  const { class: className = '', amount }: Props = $props();

  const classes = $derived(['HomeCurrencyExchange', className].filter(Boolean));
  const exchangeRate = $derived(useCurrencyExchangeStore.exchangeRate);
  const isFetching = $derived(useCurrencyExchangeStore.fetching);
</script>

{#if exchangeRate && !isFetching}
  <ExchangeAmount
    class={classes.join(' ')}
    locale={useSettingsStore.settings.locale}
    {amount}
    exchangeRate={exchangeRate.exchangeRate}
    currency={exchangeRate.homeCurrency}
  />
{/if}
