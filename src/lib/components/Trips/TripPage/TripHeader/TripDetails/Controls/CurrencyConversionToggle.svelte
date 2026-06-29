<script>
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const homeCurrency = $derived(useSettingsStore.settings.homeCurrency);
  const tripCurrency = $derived(useTripStore.trip?.currency);
  const isCurrencySame = $derived(homeCurrency === tripCurrency);
  const isShow = $derived(useSettingsStore.settings.enableCurrencyConversion && !isCurrencySame);
  const isEnabled = $derived(
    useTripStore.trip?.deviceOnlyData?.enableCurrencyConversion === false ? false : true,
  );

  let loading = $state(false);

  async function toggleCurrencyConversion() {
    try {
      loading = true;

      await useTripStore.updateEnableCurrencyConversion(!isEnabled);
    } catch (e) {
      console.log('debug:', e);
    } finally {
      loading = false;
    }
  }
</script>

{#if isShow}
  <Button
    aria-label="Toggle currency conversion"
    class="CurrencyConversionToggleButton"
    variant="text"
    roundness="full"
    title="Toggle currency conversion"
    compact
    color={isEnabled ? 'secondary' : 'neutral'}
    onclick={toggleCurrencyConversion}
    disabled={loading}
  >
    {#if isEnabled}
      <Icon icon="material-symbols:currency-exchange" />
    {:else}
      <Icon icon="mdi:currency-usd-off" />
    {/if}
  </Button>
{/if}

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.CurrencyConversionToggleButton) {
    font-size: 1.5rem;
  }
</style>
