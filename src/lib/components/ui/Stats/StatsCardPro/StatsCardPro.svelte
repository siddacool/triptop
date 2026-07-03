<script lang="ts" module>
  import type { GroupStats } from '$lib/stores/stats/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import StatsHeader from './StatsHeader/StatsHeader.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/BasicStats/Title.svelte';
  import type { SortStage } from '../Controls/Sort/Sort.svelte';
  import type { LevelStage } from '../Controls/Levels/Levels.svelte';
  import Summaries from './Summaries.svelte';

  export type StatsCardProProps = {
    class?: string;
    title?: string;
    level?: LevelStage;
    sort?: SortStage;
    showLevel?: boolean;
    showSort?: boolean;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };
</script>

<script lang="ts">
  let {
    class: className = '',
    title,
    level = $bindable('normal'),
    showLevel = false,
    showSort = false,
    sort = $bindable('default'),
    groupStats,
    trip,
    customTopicTitle,
  }: StatsCardProProps = $props();

  function sortGroupStats(groups: GroupStats[]) {
    const sortedGroupStats = [...groups].sort((a, b) => b.stats.share - a.stats.share);

    return sortedGroupStats;
  }

  const classes = $derived(['StatsCardPro', className].filter(Boolean));
  const sortedGroupStats = $derived(sort === 'high' ? sortGroupStats(groupStats) : groupStats);
</script>

<div class={classes.join(' ')}>
  <Card class="StatsCardProCard">
    <StatsHeader {showLevel} {showSort} {title} bind:level bind:sort />
    <Summaries groupStats={sortedGroupStats} {trip} {customTopicTitle} {level} {sort} />
  </Card>
</div>

<style lang="scss">
  .StatsCardPro {
    width: 100%;

    :global(.StatsCardProCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
