<script lang="ts" module>
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { LevelStage } from '../Controls/Levels/Levels.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import BasicStats from './BasicStats/BasicStats.svelte';
  import type { StatsTopicTitleContext } from './BasicStats/Title.svelte';
  import Total from './Total/Total.svelte';
  import DetailedStats from './DetailedStats/DetailedStats.svelte';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';

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
  <Grid gap={2}>
    {#if showBasicStats}
      <Column>
        <BasicStats
          {topicTitle}
          {customTopicTitle}
          {expenseSummary}
          {level}
          detailed={level === 'normal' ? false : true}
        />
      </Column>
    {/if}

    {#if level === 'amateur'}
      <Column>
        <Total {trip} {expenseSummary} />
      </Column>
    {/if}

    {#if level === 'expert'}
      <Column>
        <DetailedStats {trip} {expenseSummary} />
      </Column>
    {/if}
  </Grid>
</div>

<style lang="scss">
  .MultiLevelSummary {
    width: 100%;

    &.level--normal {
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

    &.level--amateur,
    &.level--expert {
      display: flex;
      flex-direction: column;

      :global(.cell) {
        padding: 0;
      }
    }
  }
</style>
