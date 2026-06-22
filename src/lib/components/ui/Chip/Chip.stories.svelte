<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Chip from './Chip.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Chip,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">Hello</Story>
