<script lang="ts">
  import CalcRateAmountExchangeValue from './CalcRateAmountExchangeValue.svelte';
  import { useLatestCurrencyExchangeStore } from '$lib/stores/currency/exchange/latest.svelte';

  type Props = {
    class?: string;
    amount: number;
  };

  const { class: className = '', amount }: Props = $props();

  const exchangeRate = $derived(useLatestCurrencyExchangeStore.exchangeRate?.exchangeRate);

  const classes = $derived(['AutoCalcRateAmountExchangeValue', className].filter(Boolean));
</script>

{#if exchangeRate}
  <CalcRateAmountExchangeValue class={classes.join(' ')} {exchangeRate} {amount} />
{/if}
