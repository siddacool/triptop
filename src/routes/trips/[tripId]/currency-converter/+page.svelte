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

  const tripId = page.params.tripId;
  let loading = $state(true);
  const tripCurrency = $derived(tripDetailStore.trip?.currency);
  const homeCurrency = $derived(settingsStore.settings.homeCurrency);

  const loadLiveRates = async () => {
    try {
      if (tripCurrency && homeCurrency) {
        await liveRatesExchangeStore.load(tripCurrency, homeCurrency);
      }
    } finally {
      loading = false;
    }
  };

  $effect(() => {
    if (!tripId) {
      loading = false;
      return;
    }

    if (!tripCurrency || !homeCurrency) {
      return;
    }

    if (tripCurrency === homeCurrency) {
      goto(resolve(`/trips/${tripId}`), { replaceState: true });
      return;
    }

    loadLiveRates();
  });
</script>

<svelte:head>
  <title>Currency converter</title>
</svelte:head>

<CurrencyConverterHeader />

<LoadingBoundary {loading}>
  <CurrencyConverter />
</LoadingBoundary>
