<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ProgressFill from './ProgressFill.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ProgressFill,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: 0.44 }} />
