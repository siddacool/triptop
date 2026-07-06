<script lang="ts" module>
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import BasicStats from './BasicStats/BasicStats.svelte';
  import type { StatsTopicTitleContext } from './BasicStats/Title.svelte';
  import DetailedStats from './DetailedStats/DetailedStats.svelte';
  import type { LevelStage } from '../Controls/DetailsExpander/DetailsExpander.svelte';

  export type MultiLevelSummaryProps = {
    class?: string;
    trip: Trip;
    level: LevelStage;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
    showBasicStats?: boolean;
  };
</script>

<script lang="ts">
  let {
    trip,
    class: className = '',
    topicTitle,
    customTopicTitle,
    level,
    expenseSummary,
    showBasicStats = true,
  }: MultiLevelSummaryProps = $props();

  const classes = $derived(['MultiLevelSummary', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if showBasicStats}
    <BasicStats
      {topicTitle}
      {customTopicTitle}
      {expenseSummary}
      {level}
      detailed={level === 'normal' ? false : true}
    />
  {/if}

  {#if level === 'expert'}
    <DetailedStats {trip} {expenseSummary} />
  {/if}
</div>

<style lang="scss">
  .MultiLevelSummary {
    width: 100%;
  }
</style>
