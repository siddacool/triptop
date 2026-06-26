<script lang="ts">
  import { page } from '$app/state';
  import { useLatestCurrencyExchangeStore } from '$lib/stores/currency/exchange/latest.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;

  onMount(() => {
    if (!tripId) {
      return;
    }

    const loadTrip = async () => {
      try {
        useLatestCurrencyExchangeStore.clear();

        const tripCurrency = useTripStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await useLatestCurrencyExchangeStore.fetchSilent(tripCurrency, homeCurrency);
        }
      } catch (error) {
        console.error('Failed to fetch exchange:', error);
      }
    };

    loadTrip();
  });
</script>

{@render children()}
