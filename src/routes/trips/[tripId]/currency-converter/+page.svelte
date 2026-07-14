<script lang="ts">
  import { page } from '$app/state';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onMount } from 'svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import CurrencyConverterHeader from '$lib/features/exchange/components/CurrencyConverterHeader.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import CurrencyConverter from '$lib/features/exchange/components/CurrencyConverter.svelte';

  const tripId = page.params.tripId;

  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      loading = false;
      return;
    }

    const loadLiveRates = async () => {
      try {
        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = settingsStore.settings.homeCurrency;

        if (tripCurrency && homeCurrency) {
          await liveRatesExchangeStore.load(tripCurrency, homeCurrency);
        }
      } finally {
        loading = false;
      }
    };

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
