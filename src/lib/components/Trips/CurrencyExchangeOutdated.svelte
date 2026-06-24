<script>
  import Callout from '$lib/components/ui/Callout/Callout.svelte';
  import { useCurrencyExchangeStore } from '$lib/stores/currency/exchange.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { createDate } from '@flightlesslabs/time-utils';

  const requestedAt = $derived(
    useCurrencyExchangeStore.exchangeRate?.requestedAt
      ? createDate(useCurrencyExchangeStore.exchangeRate?.requestedAt)
      : undefined,
  );
  const lastSynced = $derived(
    requestedAt ? requestedAt.format(useSettingsStore.settings.dateFormat) : undefined,
  );
</script>

{#if useCurrencyExchangeStore.isRateOutdated}
  <Callout color="warning" size="small">
    Currency exchange rate ({useTripStore.trip?.currency} to {useSettingsStore.settings
      .homeCurrency}) last synced at {lastSynced}
  </Callout>
{/if}
