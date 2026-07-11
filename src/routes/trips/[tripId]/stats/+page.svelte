<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onMount } from 'svelte';
  import StatsList from '$lib/features/stats/components/StatsList/StatsList.svelte';
  import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';
  import { statsStore } from '$lib/features/stats/store/main.svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import StatsHeader from '$lib/features/stats/components/StatsHeader/StatsHeader.svelte';

  const tripId = page.params.tripId;

  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      loading = false;
      return;
    }

    const loadTrip = async () => {
      try {
        await tripDetailStore.load(tripId);

        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = settingsStore.settings.homeCurrency;
        const enableCurrencyConversion = settingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await historicalRatesExchangeStore.load(tripId, tripCurrency, homeCurrency);
        }

        await expenseListStore.load(tripId);
        await statsStore.load();
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });
</script>

<svelte:head>
  <title>Trip statistics</title>
</svelte:head>

<StatsHeader />

<LoadingBoundary {loading}>
  {#if expenseListStore.expenses.length}
    <Box>
      <StatsList />
    </Box>
  {:else}
    <Box>
      <Instructions>No stats for you</Instructions>
    </Box>
  {/if}
</LoadingBoundary>
