<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import Title, { type StatsTopicTitleContext } from './Title.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import Share from './Share/Share.svelte';
  import type { LevelStage } from '../../Controls/Levels/Levels.svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    trip: Trip;
    level: LevelStage;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };

  let {
    class: className = '',
    level,
    topicTitle,
    trip,
    expenseSummary,
    customTopicTitle,
  }: Props = $props();

  const classes = $derived(['tr', 'BasicStats', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Title {expenseSummary} {level} {topicTitle} {customTopicTitle} />
  <Share {expenseSummary} />
</div>

<style lang="scss">
  .BasicStats {
  }
</style>
