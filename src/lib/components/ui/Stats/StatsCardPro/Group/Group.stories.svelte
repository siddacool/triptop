<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Group from './Group.svelte';
  import { mockStatsData } from '$lib/stores/stats/data/mock-stats-data';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Group,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ groupStat: mockStatsData.categoryStats[0] }}>
  {mockStatsData.categoryStats[0].id}
</Story>
