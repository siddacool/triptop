<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatsCardPro from './StatsCardPro.svelte';
  import { mockStatsData } from '$lib/stores/stats/data/mock-stats-data';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: StatsCardPro,
    tags: ['autodocs'],
    args: {
      trip: mockDataTrips[0],
      showLevel: true,
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

<Story
  name="Expert"
  args={{
    groupStats: mockStatsData.categoryStats,
    title: 'Categories',
    level: 'expert',
  }}
/>

<Story
  name="Hide basic"
  args={{
    groupStats: mockStatsData.categoryStats,
    title: 'Categories',
    level: 'expert',
    showBasicStats: false,
  }}
/>

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <StatsCardPro
      groupStats={mockStatsData.categoryStats}
      title="Categories"
      trip={mockDataTrips[0]}
      showLevel
    />
  </Theme>
</Story>
