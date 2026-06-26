<script lang="ts">
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { convertCurrency } from '$lib/helpers/convert-currency';
  import MoneyExchangeValue from '../MoneyExchangeValue.svelte';

  type Props = {
    class?: string;
    amount: number;
    exchangeRate: number;
  };

  const { class: className = '', amount, exchangeRate }: Props = $props();
  const homeCurrency = $derived(useSettingsStore.settings.homeCurrency);
  const locale = $derived(useSettingsStore.settings.locale);
  const isShow = $derived(useSettingsStore.settings.enableCurrencyConversion);

  const classes = $derived(['CalcRateAmountExchangeValue', className].filter(Boolean));
  const value = $derived(convertCurrency(amount, exchangeRate));
</script>

{#if isShow}
  <MoneyExchangeValue {value} currency={homeCurrency} {locale} class={classes.join(' ')} />
{/if}
