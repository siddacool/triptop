<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CategorySelect from './CategorySelect.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: CategorySelect,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
