<script lang="ts">
  import MoneyExchangeValue from './MoneyExchangeValue.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';

  type Props = {
    class?: string;
    amount?: number;
  };

  const { class: className = '', amount }: Props = $props();
  const homeCurrency = $derived(useSettingsStore.settings.homeCurrency);
  const locale = $derived(useSettingsStore.settings.locale);
  const tripCurrency = $derived(useTripStore.trip?.currency);
  const isCurrencySame = $derived(homeCurrency === tripCurrency);
  const isShow = $derived(useSettingsStore.settings.enableCurrencyConversion && !isCurrencySame);

  const classes = $derived(['ExpenseAmountExchangeValue', className].filter(Boolean));
</script>

{#if isShow}
  <MoneyExchangeValue value={amount} currency={homeCurrency} {locale} class={classes.join(' ')} />
{/if}
