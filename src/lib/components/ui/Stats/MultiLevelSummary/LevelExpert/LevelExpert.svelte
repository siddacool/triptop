<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import BasicInfo from './BasicInfo/BasicInfo.svelte';
  import type { StatsTopicTitleContext } from '../LevelNormal/Title.svelte';
  import DetailedStats from './DetailedStats/DetailedStats.svelte';
  import type { Trip } from '$lib/stores/trip/types';

  type Props = {
    class?: string;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    trip: Trip;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };

  let {
    class: className = '',
    topicTitle,
    trip,
    expenseSummary,
    customTopicTitle,
  }: Props = $props();

  const classes = $derived(['MultiLevelSummary', 'LevelExpert', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <BasicInfo {expenseSummary} {topicTitle} {customTopicTitle} />
  <DetailedStats {expenseSummary} {trip} />
</div>

<style lang="scss">
  .LevelExpert {
    display: flex;
    flex-direction: column;
  }
</style>
