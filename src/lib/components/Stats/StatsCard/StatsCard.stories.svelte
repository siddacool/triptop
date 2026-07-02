<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatsCard from './StatsCard.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: StatsCard,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ title: 'Summary card' }}>Hello</Story>
