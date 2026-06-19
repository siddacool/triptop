<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CategoryShowCase from './CategoryShowCase.svelte';
  import { categoryOptions } from '$lib/stores/category/data';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: CategoryShowCase,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: categoryOptions[2].value }} />
