<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EditGadget from './EditGadget.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: EditGadget,
    tags: ['autodocs'],
    args: {
      amount: '35',
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
