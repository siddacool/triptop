<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PaymentModeShowCase from './PaymentModeShowCase.svelte';
  import { paymentModesOptions } from '$lib/stores/payment-modes/data';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: PaymentModeShowCase,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: paymentModesOptions[0].value }} />
