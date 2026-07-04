<script lang="ts">
  import type { GroupStats } from '$lib/stores/stats/types';
  import type { Trip } from '$lib/stores/trip/types';
  import type { Snippet } from 'svelte';
  import type { LevelStage } from '../Controls/Levels/Levels.svelte';
  import type { SortStage } from '../Controls/Sort/Sort.svelte';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/BasicStats/Title.svelte';
  import MultiLevelSummary from '../MultiLevelSummary/MultiLevelSummary.svelte';

  type Props = {
    class?: string;
    level?: LevelStage;
    sort?: SortStage;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
    showBasicStats: boolean;
  };

  let {
    class: className = '',
    level = $bindable('normal'),
    sort = $bindable('default'),
    groupStats,
    trip,
    customTopicTitle,
    showBasicStats,
  }: Props = $props();

  function sortGroupStats(groups: GroupStats[]) {
    const sortedGroupStats = [...groups].sort((a, b) => b.stats.share - a.stats.share);

    return sortedGroupStats;
  }

  const classes = $derived(['Summaries', `level--${level}`, className].filter(Boolean));
  const sortedGroupStats = $derived(sort === 'high' ? sortGroupStats(groupStats) : groupStats);
</script>

<div class={classes.join(' ')}>
  {#each sortedGroupStats as groupStat (groupStat.id)}
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
