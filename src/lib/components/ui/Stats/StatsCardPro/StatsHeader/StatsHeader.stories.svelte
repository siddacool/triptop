<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatsHeader from './StatsHeader.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: StatsHeader,
    tags: ['autodocs'],
    args: {
      showSort: true,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ title: 'Title' }} />
