<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import LiveCurrencyExchangeCalculator from './LiveCurrencyExchangeCalculator.svelte';
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: LiveCurrencyExchangeCalculator,
    tags: ['autodocs'],
    args: {
      homeCurrency: 'INR',
      tripCurrency: 'USD',
      exchangeRate: 95.63,
      activeCurrency: LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story
  name="Home Currency"
  args={{ activeCurrency: LiveCurrencyExchangeActiveCurrency.HOME_CURRENCY }}
/>
