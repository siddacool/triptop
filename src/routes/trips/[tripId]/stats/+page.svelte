<script lang="ts">
  import { page } from '$app/state';
  import StatsHeader from '$lib/components/Stats/StatsHeader/StatsHeader.svelte';
  import StatsList from '$lib/components/Stats/StatsList/StatsList.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onMount } from 'svelte';

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
          await useHistoricalCurrencyExchangeStore.fetchSilent(tripId, tripCurrency, homeCurrency);
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
