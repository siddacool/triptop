<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Sort from './Sort.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Sort,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: 'default' }} />
