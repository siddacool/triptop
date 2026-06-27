<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import RedirectHomePage from '$lib/components/ui/RedirectHomePage/RedirectHomePage.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onDestroy, onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;

  let pass = $state(false);
  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      return;
    }

    const loadTrip = async () => {
      try {
        await useTripStore.fetch(tripId);
        pass = true;

        useTripActivePageStore.updateActiveTrip(tripId);
      } catch (error) {
        console.error('Failed to fetch trip:', error);
        useTripActivePageStore.reset();
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });

  onDestroy(() => {
    useTripStore.reset();
    useExpenseListStore.reset();
    useExpenseStore.reset();
    useHistoricalCurrencyExchangeStore.clear();
  });

  beforeNavigate((navigation) => {
    // Ignore refresh/tab close
    if (!navigation.to) return;

    const url = navigation.to.url.href;

    // prevent action if within same layout
    if (tripId && url.includes(`/trips/${tripId}`)) {
      return;
    }

    useTripActivePageStore.reset();
  });
</script>

{#if loading}
  <Loading />
{:else if pass}
  {@render children()}
{:else}
  <RedirectHomePage>Trip does not exists</RedirectHomePage>
{/if}
