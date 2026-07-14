<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DisplayGadget from './DisplayGadget.svelte';
  import { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: DisplayGadget,
    tags: ['autodocs'],
    args: {
      homeCurrency: 'INR',
      tripCurrency: 'USD',
      exchangeRate: 95.63,
      amount: '1',
      activeCurrency: LiveCurrencyExchangeActiveCurrency.TRIP_CURRENCY,
      homeCurrencyLocale: undefined,
      tripCurrencyLocale: undefined,
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
