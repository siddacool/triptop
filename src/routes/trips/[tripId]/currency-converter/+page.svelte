<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onMount } from 'svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import CurrencyConverterHeader from '$lib/features/exchange/components/CurrencyConverterHeader.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import LiveCurrencyExchangeCalculator from '$lib/features/exchange/components/LiveCurrencyExchangeCalculator/LiveCurrencyExchangeCalculator.svelte';

  const tripId = page.params.tripId;

  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      loading = false;
      return;
    }

    const loadTrip = async () => {
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

    loadTrip();
  });

  const exchangeRate = $derived(liveRatesExchangeStore?.exchangeRate?.data[0].exchangeRate);
  const trip = $derived(tripDetailStore.trip);
  const activeCurrency = $derived(trip?.liveCurrencyExchangeActiveCurrency);
</script>

<svelte:head>
  <title>Currency converter</title>
</svelte:head>

<CurrencyConverterHeader />

<LoadingBoundary {loading}>
  {#if trip && exchangeRate}
    <Box>
      <LiveCurrencyExchangeCalculator
        homeCurrency={settingsStore.settings.homeCurrency}
        tripCurrency={trip.currency}
        {exchangeRate}
        homeCurrencyLocale={settingsStore.settings.locale}
        tripCurrencyLocale={trip.locale}
        bind:activeCurrency
      />
    </Box>
  {/if}
</LoadingBoundary>
