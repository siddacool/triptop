<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CategoryIcon from './CategoryIcon.svelte';
  import { categoryOptions } from '$lib/stores/expense/types';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: CategoryIcon,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: categoryOptions[2].value }} />
