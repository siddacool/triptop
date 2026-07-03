<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatsCardPro from './StatsCardPro.svelte';
  import { mockStatsData } from '$lib/stores/stats/data/mock-stats-data';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: StatsCardPro,
    tags: ['autodocs'],
    args: {
      trip: mockDataTrips[0],
      showLevel: true,
      showSort: true,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story
  name="Default"
  args={{
    groupStats: mockStatsData.categoryStats,
    title: 'Categories',
  }}
/>
