<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MultiStats from './MultiStats.svelte';
  import { mockStatsData } from '$lib/stores/stats/data/mock-stats-data';
  import { categoryOptions } from '$lib/stores/category/data';
  import CategoryIcon from '../../Category/CategoryIcon/CategoryIcon.svelte';
  import { createDate } from '$lib/helpers/date-time/createDate';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: MultiStats,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ groupStats: mockStatsData.categoryStats }} />

<Story name="CustomTitle" asChild>
  <MultiStats groupStats={mockStatsData.categoryStats}>
    {#snippet customTitle({ groupStat })}
      <CategoryIcon value={categoryOptions.find((item) => item.value === groupStat.id)?.value} />
      {categoryOptions.find((item) => item.value === groupStat.id)?.label}
    {/snippet}
  </MultiStats>
</Story>

<Story name="CustomTitleDate" asChild>
  <MultiStats groupStats={mockStatsData.dateStats}>
    {#snippet customTitle({ groupStat })}
      {createDate(groupStat.id).format('MMM D, ddd')}
    {/snippet}
  </MultiStats>
</Story>

<Story name="Level Expert" args={{ groupStats: mockStatsData.categoryStats, level: 'expert' }} />
