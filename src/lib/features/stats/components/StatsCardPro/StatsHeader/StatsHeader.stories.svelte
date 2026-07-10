<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatsHeader from './StatsHeader.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: StatsHeader,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ title: 'Title' }} />
