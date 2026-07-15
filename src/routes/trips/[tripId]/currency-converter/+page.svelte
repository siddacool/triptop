<script lang="ts">
  import { page } from '$app/state';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import CurrencyConverterHeader from '$lib/features/exchange/components/CurrencyConverterHeader.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import CurrencyConverter from '$lib/features/exchange/components/CurrencyConverter.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;
  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      loading = false;
      return;
    }

    const loadTrip = async () => {
      try {
        liveRatesExchangeStore.clear();
        await tripDetailStore.load(tripId);

        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = settingsStore.settings.homeCurrency;
        const enableCurrencyConversion = settingsStore.settings.enableCurrencyConversion;

        if (tripCurrency === homeCurrency) {
          goto(resolve(`/trips/${tripId}`), { replaceState: true });
          return;
        }

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await liveRatesExchangeStore.load(tripCurrency, homeCurrency);
        }
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });
</script>

<svelte:head>
  <title>Currency converter</title>
</svelte:head>

<CurrencyConverterHeader />

<LoadingBoundary {loading}>
  <CurrencyConverter />
</LoadingBoundary>
