<script>
  import { page } from '$app/state';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { updateTripCurrencyConversionFlag } from '$lib/features/trip/logic/crud.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
  const homeCurrency = $derived(settingsStore.settings.homeCurrency);
  const tripCurrency = $derived(tripDetailStore.trip?.currency);
  const isCurrencySame = $derived(homeCurrency === tripCurrency);
  const isShow = $derived(
    settingsStore.settings.enableCurrencyConversion &&
      !isCurrencySame &&
      expenseListStore.expenses.length,
  );
  const isEnabled = $derived(
    tripDetailStore.trip?.enableCurrencyConversion === false ? false : true,
  );

  let loading = $state(false);

  async function toggleCurrencyConversion() {
    try {
      loading = true;

      await updateTripCurrencyConversionFlag(tripId, !isEnabled);
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
