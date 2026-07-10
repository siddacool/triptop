<script lang="ts">
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { Money } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    amount?: number;
  };

  const { class: className = '', amount }: Props = $props();
  const homeCurrency = $derived(settingsStore.settings.homeCurrency);
  const locale = $derived(settingsStore.settings.locale);
  const tripCurrency = $derived(tripDetailStore.trip?.currency);
  const isCurrencySame = $derived(homeCurrency === tripCurrency);
  const isShow = $derived(
    settingsStore.settings.enableCurrencyConversion &&
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
