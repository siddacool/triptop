<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onMount } from 'svelte';
  import StatsList from '$lib/features/stats/components/StatsList/StatsList.svelte';
  import StatsHeader from '$lib/features/stats/components/StatsCardPro/StatsHeader/StatsHeader.svelte';
  import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';

  const tripId = page.params.tripId;

  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      return;
    }

    const loadTrip = async () => {
      try {
        await tripDetailStore.load(tripId);

        const tripCurrency = tripDetailStore.trip?.currency;
        const homeCurrency = useSettingsStore.settings.homeCurrency;
        const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

        if (tripCurrency && homeCurrency && enableCurrencyConversion) {
          await historicalRatesExchangeStore.load(tripId, tripCurrency, homeCurrency);
        }

        await expenseListStore.load(tripId);
        await useTripStatsStore.fetch();
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

{#snippet content()}
  {#if expenseListStore.expenses.length}
    <Box>
      <StatsList />
    </Box>
  {:else}
    <Box>
      <Instructions>No stats for you</Instructions>
    </Box>
  {/if}
{/snippet}

<StatsHeader />
{#if loading}
  <Loading />
{:else}
  {@render content()}
{/if}
