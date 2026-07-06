<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import Title, { type StatsTopicTitleContext } from './Title.svelte';
  import Share from './Share/Share.svelte';
  import type { Snippet } from 'svelte';
  import type { LevelStage } from '../../Controls/DetailsExpander/DetailsExpander.svelte';

  type Props = {
    class?: string;
    level: LevelStage;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
    detailed?: boolean;
  };

  let {
    class: className = '',
    level,
    topicTitle,
    expenseSummary,
    customTopicTitle,
    detailed,
  }: Props = $props();

  const classes = $derived(
    ['BasicStats', `${detailed ? 'detailed' : ''}`, className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  <Title {expenseSummary} {level} {topicTitle} {customTopicTitle} {detailed} />
  <Share {expenseSummary} {detailed} />
</div>

<style lang="scss">
  .BasicStats {
    display: flex;
    flex-wrap: wrap;
  }
</style>
