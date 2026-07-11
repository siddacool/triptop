<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MultiLevelSummary from './MultiLevelSummary.svelte';
  import { mockDataTrips } from '$lib/features/trip/mocks/mock-data-trips';
  import { mockStatsData } from '../../mocks/mock-stats-data';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: MultiLevelSummary,
    tags: ['autodocs'],
    args: {
      trip: mockDataTrips[0],
      expenseSummary: mockStatsData.categoryStats[0].stats,
      topicTitle: mockStatsData.categoryStats[0].id,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Normal" args={{ level: 'normal' }} />

<Story name="Expert" args={{ level: 'expert' }} />
