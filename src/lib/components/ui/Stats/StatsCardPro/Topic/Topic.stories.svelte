<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Topic from './Topic.svelte';
  import { mockStatsData } from '$lib/stores/stats/data/mock-stats-data';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Topic,
    tags: ['autodocs'],
    args: {
      groupStat: mockStatsData.categoryStats[0],
      trip: mockDataTrips[0],
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">
  {mockStatsData.categoryStats[0].id}
</Story>
