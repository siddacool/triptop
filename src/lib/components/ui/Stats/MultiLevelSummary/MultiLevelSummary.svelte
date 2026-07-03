<script lang="ts" module>
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { LevelStage } from '../Controls/Levels/Levels.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import BasicStats from './BasicStats/BasicStats.svelte';
  import type { StatsTopicTitleContext } from './BasicStats/Title.svelte';
  import Total from './Total/Total.svelte';

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
    <div class="table">
      <BasicStats {trip} {topicTitle} {customTopicTitle} {expenseSummary} {level} />
    </div>
  {/if}

  <div class="cell">
    <Total {trip} {expenseSummary} />
  </div>
</div>

<style lang="scss">
  .MultiLevelSummary {
    width: 100%;

    &.level--normal {
      :global(.expert) {
        display: none;
      }

      :global(.amateur) {
        display: none;
      }

      :global(.table) {
        display: table;
        width: 100%;
      }

      :global(.tr) {
        display: table-row;
      }

      :global(.cell) {
        display: table-cell;
        padding: var(--dodo-ui-space);
        vertical-align: middle;
      }
    }

    &.level--amateur {
      display: flex;
      flex-direction: column;

      :global(.amateur) {
        display: flex;
      }

      :global(.expert) {
        display: none;
      }

      :global(.cell) {
        padding: var(--dodo-ui-space) 0;
      }

      :global(.Title) {
        font-size: 1.2rem;
      }
    }
  }
</style>
