<script lang="ts">
  import Box from '$lib/components/ui/Box/Box.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import LiveCurrencyExchangeCalculator from './LiveCurrencyExchangeCalculator/LiveCurrencyExchangeCalculator.svelte';

  const exchangeRate = $derived(liveRatesExchangeStore?.exchangeRate?.data[0].exchangeRate);
  const trip = $derived(tripDetailStore.trip);
  let activeCurrency = $derived(
    trip?.liveCurrencyExchangeActiveCurrency || LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
  );
</script>

{#if trip && exchangeRate}
  <div class="CurrencyConverter">
    <Box>
      <LiveCurrencyExchangeCalculator
        homeCurrency={settingsStore.settings.homeCurrency}
        tripCurrency={trip.currency}
        {exchangeRate}
        homeCurrencyLocale={settingsStore.settings.locale}
        tripCurrencyLocale={trip.locale}
        bind:activeCurrency
      />
    </Box>
  </div>
{/if}

<style lang="scss">
  .CurrencyConverter {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);

    :global(.Box) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
