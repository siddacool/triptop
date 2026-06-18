<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PaymentModeSelect from './PaymentModeSelect.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: PaymentModeSelect,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
