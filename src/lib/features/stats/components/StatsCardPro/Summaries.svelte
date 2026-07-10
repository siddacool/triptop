<script lang="ts">
  import type { GroupStats } from '$lib/stores/stats/types';
  import type { Trip } from '$lib/features/trip/types';
  import type { Snippet } from 'svelte';
  import MultiLevelSummary from '../MultiLevelSummary/MultiLevelSummary.svelte';
  import type { LevelStage } from '../Controls/DetailsExpander/DetailsExpander.svelte';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/LevelNormal/Title.svelte';

  type Props = {
    class?: string;
    level?: LevelStage;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };

  let {
    class: className = '',
    level = $bindable('normal'),
    groupStats,
    trip,
    customTopicTitle,
  }: Props = $props();

  const classes = $derived(['Summaries', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each groupStats as groupStat (groupStat.id)}
    <MultiLevelSummary
      {trip}
      {level}
      {customTopicTitle}
      topicTitle={groupStat.id}
      expenseSummary={groupStat.stats}
    />
  {/each}
</div>

<style lang="scss">
  .Summaries {
    &.level--normal {
      display: table;
      width: 100%;
    }

    &.level--expert {
      :global(.MultiLevelSummary) {
        margin-bottom: calc(var(--dodo-ui-space) * 4);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
