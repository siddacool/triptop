<script lang="ts">
  import { page } from '$app/state';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import CurrencyConverterHeader from '$lib/features/exchange/components/CurrencyConverterHeader.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import CurrencyConverter from '$lib/features/exchange/components/CurrencyConverter.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { networkStatusStore } from '$lib/features/sentry/store/network-status.svelte';

  const tripId = page.params.tripId;
  const online = $derived(networkStatusStore.online);

  const loadTrip = async () => {
    if (!tripId) {
      return;
    }

    await tripDetailStore.load(tripId);

    const tripCurrency = tripDetailStore.trip?.currency;
    const homeCurrency = settingsStore.settings.homeCurrency;

    if (tripCurrency === homeCurrency) {
      goto(resolve(`/trips/${tripId}`), { replaceState: true });
      return;
    }

    if (tripCurrency && homeCurrency) {
      await liveRatesExchangeStore.load(tripCurrency, homeCurrency);
    }
  };

  $effect(() => {
    console.log(online ? 'online' : 'offline');

    loadTrip();
  });
</script>

<svelte:head>
  <title>Currency converter</title>
</svelte:head>

<CurrencyConverterHeader />
<CurrencyConverter />
