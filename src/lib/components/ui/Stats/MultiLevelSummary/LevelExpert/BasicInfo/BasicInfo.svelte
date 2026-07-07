<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { StatsTopicTitleContext } from '../../LevelNormal/Title.svelte';
  import Title from './Title.svelte';

  type Props = {
    class?: string;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };

  let { class: className = '', topicTitle, expenseSummary, customTopicTitle }: Props = $props();

  const classes = $derived(['BasicInfo', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Title {expenseSummary} {topicTitle} {customTopicTitle} />
</div>

<style lang="scss">
  .BasicInfo {
    display: flex;
    flex-direction: column;
  }
</style>
