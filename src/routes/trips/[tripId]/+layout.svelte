<script lang="ts">
  import { page } from '$app/state';
  import { useCurrencyExchangeStore } from '$lib/stores/currency/exchange.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;

  const tripCurrency = $derived(useTripStore.trip?.currency);
  const homeCurrency = $derived(useSettingsStore.settings.homeCurrency);
  const enableCurrencyConversion = $derived(useSettingsStore.settings.enableCurrencyConversion);

  onMount(() => {
    if (!tripId) {
      return;
    }

    useTripStore.fetch(tripId);
  });

  $effect(() => {
    if (!tripCurrency || !homeCurrency || !enableCurrencyConversion) {
      useCurrencyExchangeStore.clear();

      return;
    }

    useCurrencyExchangeStore.fetch(tripCurrency, homeCurrency);
  });
</script>

{@render children()}
