<script lang="ts">
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    amount?: number;
  };

  const { class: className = '', amount }: Props = $props();
  const homeCurrency = $derived(useSettingsStore.settings.homeCurrency);
  const locale = $derived(useSettingsStore.settings.locale);
  const tripCurrency = $derived(useTripStore.trip?.currency);
  const isCurrencySame = $derived(homeCurrency === tripCurrency);
  const isShow = $derived(
    useSettingsStore.settings.enableCurrencyConversion &&
      !isCurrencySame &&
      (amount || amount === 0),
  );

  const classes = $derived(['HomeCurrencyExchange', className].filter(Boolean));
</script>

{#if isShow}
  <div class={classes.join(' ')}>
    <Money value={amount} currency={homeCurrency} {locale} />
  </div>
{/if}

<style lang="scss">
  .HomeCurrencyExchange {
    display: inline-flex;
    font-size: inherit;
    color: var(--dodo-color-secondary-500);
  }

  :global(.dodo-theme--dark .HomeCurrencyExchange) {
    color: var(--dodo-color-secondary-600);
  }
</style>
