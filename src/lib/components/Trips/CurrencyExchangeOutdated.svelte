<script>
  import Callout from '$lib/components/ui/Callout/Callout.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { createDate } from '$lib/helpers/date-time/createDate';
  import { useLatestCurrencyExchangeStore } from '$lib/stores/currency/exchange/latest.svelte';

  const requestedAt = $derived(
    useLatestCurrencyExchangeStore.exchangeRate?.requestedAt
      ? createDate(useLatestCurrencyExchangeStore.exchangeRate?.requestedAt)
      : undefined,
  );
  const lastSynced = $derived(
    requestedAt ? requestedAt.format(useSettingsStore.settings.dateFormat) : undefined,
  );
</script>

{#if useLatestCurrencyExchangeStore.isRateOutdated}
  <Callout color="warning" size="small">
    Currency exchange rate ({useTripStore.trip?.currency} to {useSettingsStore.settings
      .homeCurrency}) last synced at {lastSynced}
  </Callout>
{/if}
