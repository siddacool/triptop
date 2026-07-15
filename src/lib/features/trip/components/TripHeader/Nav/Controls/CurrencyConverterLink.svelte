<script lang="ts">
  import { page } from '$app/state';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId || '';
  const tripCurrency = $derived(tripDetailStore.trip?.currency);
  const homeCurrency = $derived(settingsStore.settings.homeCurrency);
</script>

{#if tripCurrency !== homeCurrency}
  <Button
    aria-label="Currency converter"
    class="TripHeaderCurrencyConverterLink"
    variant="text"
    roundness="pill"
    title="Currency converter"
    href={`/trips/${tripId}/currency-converter`}
    compact
    color="neutral"
    background="none"
  >
    <Icon icon="uil:exchange" />
  </Button>
{/if}

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripHeaderCurrencyConverterLink) {
    font-size: 1.6rem;
  }
</style>
