<script lang="ts">
  import Box from '$lib/components/ui/Box/Box.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import LiveCurrencyExchangeCalculator from './LiveCurrencyExchangeCalculator/LiveCurrencyExchangeCalculator.svelte';
  import { updateTripLiveCurrencyExchangeActiveCurrency } from '$lib/features/trip/logic/crud.svelte';
  import { isPWAMode } from '$lib/utils/pwa-mode';

  const liveRate = $derived(liveRatesExchangeStore?.exchangeRate?.data[0]);
  const exchangeRate = $derived(liveRate?.exchangeRate);
  const exchangeDate = $derived(liveRate?.date);
  const trip = $derived(tripDetailStore.trip);
  let activeCurrency = $derived(
    trip?.liveCurrencyExchangeActiveCurrency || LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
  );

  $effect(() => {
    if (!trip?._id) {
      return;
    }

    updateTripLiveCurrencyExchangeActiveCurrency(trip?._id, activeCurrency);
  });

  const pwaMode = $derived(isPWAMode());
  const classes = $derived(['CurrencyConverter', pwaMode ? 'pwa' : ''].filter(Boolean));
</script>

{#if trip && exchangeRate && exchangeDate}
  <div class={classes.join(' ')}>
    <Box>
      <LiveCurrencyExchangeCalculator
        homeCurrency={settingsStore.settings.homeCurrency}
        tripCurrency={trip.currency}
        {exchangeRate}
        homeCurrencyLocale={settingsStore.settings.locale}
        tripCurrencyLocale={trip.locale}
        bind:activeCurrency
        {exchangeDate}
        dateFormat={settingsStore.settings.dateFormat}
        isRateStale={liveRatesExchangeStore.isRateStale}
      />
    </Box>
  </div>
{/if}

<style lang="scss">
  .CurrencyConverter {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 150px);
    margin-top: calc(var(--dodo-ui-space) * 1);

    &.pwa {
      height: calc(100vh - 76px);
    }

    @media (min-width: 1100px) {
      height: calc(100vh - 76px);
    }

    :global(.Box) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
