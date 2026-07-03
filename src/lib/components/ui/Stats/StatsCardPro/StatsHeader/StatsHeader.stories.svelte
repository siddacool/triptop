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
      showLevel: true,
      showSort: true,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ level: 'normal', title: 'Title' }} />

<Story name="Expert" args={{ level: 'expert', title: 'Title' }} />
