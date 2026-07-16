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
  import { networkConnectionStore } from '$lib/features/shared/store/network-connection.svelte';

  const tripId = page.params.tripId;
  let loading = $state(true);

  const loadTrip = async () => {
    try {
      if (!tripId) {
        loading = false;
        return;
      }

      liveRatesExchangeStore.clear();
      await tripDetailStore.load(tripId);

      const tripCurrency = tripDetailStore.trip?.currency;
      const homeCurrency = settingsStore.settings.homeCurrency;

      if (tripCurrency === homeCurrency) {
        goto(resolve(`/trips/${tripId}`), { replaceState: true });
        return;
      }

      if (tripCurrency && homeCurrency) {
        await liveRatesExchangeStore.load(tripCurrency, homeCurrency);
      }
    } finally {
      loading = false;
    }
  };

  const backgroundRefresh = async () => {
    if (!tripId) {
      return;
    }

    await tripDetailStore.load(tripId);

    const tripCurrency = tripDetailStore.trip?.currency;
    const homeCurrency = settingsStore.settings.homeCurrency;

    if (tripCurrency === homeCurrency) {
      goto(resolve(`/trips/${tripId}`), { replaceState: true });
      return;
    }

    if (tripCurrency && homeCurrency) {
      await liveRatesExchangeStore.load(tripCurrency, homeCurrency);
    }
  };

  onMount(() => {
    loadTrip();
  });

  $effect(() => {
    if (!networkConnectionStore.online) {
      return;
    }

    backgroundRefresh();
  });
</script>

<svelte:head>
  <title>Currency converter</title>
</svelte:head>

<CurrencyConverterHeader />

<LoadingBoundary {loading}>
  <CurrencyConverter />
</LoadingBoundary>
