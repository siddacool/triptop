<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Screen from './Screen.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Screen,
    tags: ['autodocs'],
    args: {
      currency: 'INR',
      amount: 300000,
      locale: 'en-IN',
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
