<script lang="ts">
  import { page } from '$app/state';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import RedirectHomePage from '$lib/components/ui/RedirectHomePage/RedirectHomePage.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
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
        await tripDetailStore.load(tripId);
        pass = true;

        useTripActivePageStore.updateActiveTrip(tripId);
      } catch (error) {
        console.error('Failed to fetch trip:', error);
    } finally {
        loading = false;
      }
    };

    loadTrip();
  });

  onDestroy(() => {
    useHistoricalCurrencyExchangeStore.clear();
  });
</script>

{#if loading}
  <Loading />
{:else if pass}
  {@render children()}
{:else}
  <RedirectHomePage>Trip does not exists</RedirectHomePage>
{/if}
