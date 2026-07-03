<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Levels from './Levels.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Levels,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: 'normal' }} />
