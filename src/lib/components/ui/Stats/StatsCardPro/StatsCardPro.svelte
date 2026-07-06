<script lang="ts" module>
  import type { GroupStats } from '$lib/stores/stats/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import StatsHeader from './StatsHeader/StatsHeader.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/BasicStats/Title.svelte';
  import type { SortStage } from '../Controls/Sort/Sort.svelte';
  import Summaries from './Summaries.svelte';
  import DetailsExpander, {
    type LevelStage,
  } from '../Controls/DetailsExpander/DetailsExpander.svelte';

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
    showBasicStats?: boolean;
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
    showBasicStats = true,
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
    <StatsHeader {showSort} {title} bind:sort />
    <Summaries
      groupStats={sortedGroupStats}
      {trip}
      {customTopicTitle}
      {level}
      {sort}
      {showBasicStats}
    />

    {#if showLevel}
      <DetailsExpander bind:value={level} />
    {/if}
  </Card>
</div>

<style lang="scss">
  .StatsCardPro {
    width: 100%;

    :global(.StatsCardProCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    :global(.DetailsExpander) {
      margin-top: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
