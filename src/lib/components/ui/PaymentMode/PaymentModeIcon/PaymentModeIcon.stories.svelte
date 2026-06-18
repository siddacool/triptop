<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PaymentModeIcon from './PaymentModeIcon.svelte';
  import { paymentModesOptions } from '$lib/stores/expense/types';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: PaymentModeIcon,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: paymentModesOptions[0].value }} />
