<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExchangeAmount from './ExchangeAmount.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ExchangeAmount,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story
  name="Default"
  args={{ amount: 5000, locale: 'en-US', exchangeRate: 1.2, currency: 'AED' }}
/>
