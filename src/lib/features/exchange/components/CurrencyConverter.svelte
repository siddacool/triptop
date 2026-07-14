<script lang="ts">
  import Box from '$lib/components/ui/Box/Box.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { liveRatesExchangeStore } from '$lib/features/exchange/store/live-rates.svelte';
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
  import LiveCurrencyExchangeCalculator from './LiveCurrencyExchangeCalculator/LiveCurrencyExchangeCalculator.svelte';
  import Instructions from '$lib/components/ui/Instructions/Instructions.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  const exchangeRate = $derived(liveRatesExchangeStore?.exchangeRate?.data[0].exchangeRate);
  const trip = $derived(tripDetailStore.trip);
  let activeCurrency = $derived(
    trip?.liveCurrencyExchangeActiveCurrency || LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
  );
</script>

{#snippet content()}
  {#if trip && exchangeRate}
    {#if settingsStore.settings.homeCurrency === trip?.currency}
      <Instructions>Nothing to show</Instructions>
    {:else if exchangeRate}
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
    {/if}
  {/if}
{/snippet}

{#if useThemeStore.theme === 'dark'}
  {@render content()}
{:else}
  <WhiteMaterial>
    {@render content()}
  </WhiteMaterial>
{/if}
