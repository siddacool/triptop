<script>
  import Callout from '$lib/components/ui/Callout/Callout.svelte';
  import { useCurrencyExchangeStore } from '$lib/stores/currency/exchange.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { createDate } from '@flightlesslabs/time-utils';

  const today = $derived(createDate().format('YYYY-MM-DD'));
  const isOutdated = $derived(useCurrencyExchangeStore.exchangeRate?.date !== today);
  const lastSynced = $derived(
    useCurrencyExchangeStore.exchangeRate?.date
      ? createDate(useCurrencyExchangeStore.exchangeRate?.date)?.format(
          useSettingsStore.settings.dateFormat,
        )
      : undefined,
  );
</script>

{#if useCurrencyExchangeStore.exchangeRate && lastSynced && isOutdated}
  <Callout color="warning" size="small">
    Currency exchange rate ({useTripStore.trip?.currency} to {useSettingsStore.settings
      .homeCurrency}) last synced at {lastSynced}
  </Callout>
{/if}
