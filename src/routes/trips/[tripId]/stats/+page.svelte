<script lang="ts">
  import { page } from '$app/state';
  import StatsHeader from '$lib/components/Stats/StatsHeader/StatsHeader.svelte';
  import StatsList from '$lib/components/Stats/StatsList/StatsList.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStatsStore } from '$lib/stores/stats/trip-stats.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte.ts';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;
  const fetching = $derived(
    useExpenseListStore.fetching || tripDetailStore.loading || useExpenseListStore.fetching,
  );
  const mounted = $derived(useExpenseListStore.mounted && tripDetailStore.mounted);

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

        await useExpenseListStore.fetch(tripId);
        await useTripStatsStore.fetch();
      } catch (error) {
        console.error('Failed to fetch trip stats', error);
      }
    };

    loadTrip();
  });
</script>

<svelte:head>
  <title>Trip statistics</title>
</svelte:head>

{#snippet content()}
  {#if mounted && !useExpenseListStore.expenses.length}
    <Box>
      <Instructions>No stats for you</Instructions>
    </Box>
  {:else if useExpenseListStore.mounted && useExpenseListStore.expenses.length}
    <Box>
      <StatsList />
    </Box>
  {/if}
{/snippet}

<StatsHeader />
{#if fetching}
  <Loading />
{:else}
  {@render content()}
{/if}
