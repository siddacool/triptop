<script lang="ts">
  import { page } from '$app/state';
  import RedirectHomePage from '$lib/components/ui/RedirectHomePage/RedirectHomePage.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { updateActiveTrip } from '$lib/features/trip/logic/page.svelte';
  import { historicalRatesExchangeStore } from '$lib/features/exchange/store/historical-rates.svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';

  let { children } = $props();

  const tripId = page.params.tripId;

  let pass = $state(false);
  let loading = $state(true);

  onMount(() => {
    if (!tripId) {
      loading = false;
      return;
    }

    const loadTrip = async () => {
      try {
        await tripDetailStore.load(tripId);
        pass = true;

        updateActiveTrip(tripId);
      } catch (error) {
        console.error('Failed to fetch trip:', error);
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });

  onDestroy(() => {
    historicalRatesExchangeStore.clear();
  });
</script>

<LoadingBoundary {loading}>
  {#if pass}
    {@render children()}
  {:else}
    <RedirectHomePage>Trip does not exists</RedirectHomePage>
  {/if}
</LoadingBoundary>
