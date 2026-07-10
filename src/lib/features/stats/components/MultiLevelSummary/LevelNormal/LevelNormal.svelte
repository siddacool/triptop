<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import Title, { type StatsTopicTitleContext } from './Title.svelte';
  import Share from './Share.svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };

  let { class: className = '', topicTitle, expenseSummary, customTopicTitle }: Props = $props();

  const classes = $derived(['MultiLevelSummary', 'LevelNormal', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Title {expenseSummary} {topicTitle} {customTopicTitle} />
  <Share {expenseSummary} />
</div>

<style lang="scss">
  .LevelNormal {
    display: table-row;
    padding-left: 0;
  }
</style>
