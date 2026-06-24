<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import RedirectHomePage from '$lib/components/ui/RedirectHomePage/RedirectHomePage.svelte';
  import { useCurrencyExchangeStore } from '$lib/stores/currency/exchange.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;

  const tripCurrency = $derived(useTripStore.trip?.currency);
  const homeCurrency = $derived(useSettingsStore.settings.homeCurrency);
  const enableCurrencyConversion = $derived(useSettingsStore.settings.enableCurrencyConversion);
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
      } catch (error) {
        console.error('Failed to fetch trip:', error);
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });

  $effect(() => {
    if (!tripCurrency || !homeCurrency || !enableCurrencyConversion) {
      useCurrencyExchangeStore.clear();

      return;
    }

    useCurrencyExchangeStore.fetch(tripCurrency, homeCurrency);
  });

  beforeNavigate((navigation) => {
    // Ignore refresh/tab close
    if (!navigation.to) return;

    const url = navigation.to.url.href;

    // prevent action if within same layout
    if (tripId && url.includes(`/trips/${tripId}`)) {
      return;
    }

    console.log('debug:', 'Navigate out');
  });
</script>

{#if loading}
  <Loading />
{:else if pass}
  {@render children()}
{:else}
  <RedirectHomePage>Trip does not exists</RedirectHomePage>
{/if}
