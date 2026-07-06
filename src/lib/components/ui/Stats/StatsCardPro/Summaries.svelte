<script lang="ts">
  import type { GroupStats } from '$lib/stores/stats/types';
  import type { Trip } from '$lib/stores/trip/types';
  import type { Snippet } from 'svelte';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/BasicStats/Title.svelte';
  import MultiLevelSummary from '../MultiLevelSummary/MultiLevelSummary.svelte';
  import type { LevelStage } from '../Controls/DetailsExpander/DetailsExpander.svelte';

  type Props = {
    class?: string;
    level?: LevelStage;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
    showBasicStats: boolean;
  };

  let {
    class: className = '',
    level = $bindable('normal'),
    groupStats,
    trip,
    customTopicTitle,
    showBasicStats,
  }: Props = $props();

  const classes = $derived(['Summaries', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each groupStats as groupStat (groupStat.id)}
    <div class="Summary">
      <MultiLevelSummary
        {trip}
        {level}
        {customTopicTitle}
        topicTitle={groupStat.id}
        expenseSummary={groupStat.stats}
        {showBasicStats}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .Summaries {
    &.level--normal {
      .Summary {
        margin-top: calc(var(--dodo-ui-space) * 1);
      }
    }

    &.level--amateur,
    &.level--expert {
      .Summary {
        margin-bottom: calc(var(--dodo-ui-space) * 4);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
