<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { StatsTopicTitleContext } from '../../LevelNormal/Title.svelte';

  type Props = {
    class?: string;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };

  let { class: className = '', customTopicTitle, topicTitle, expenseSummary }: Props = $props();

  const classes = $derived(['Title', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if customTopicTitle}
    {@render customTopicTitle({ topicTitle, expenseSummary })}
  {:else}
    {topicTitle}
  {/if}
</div>

<style lang="scss">
  .Title {
    font-size: 1.1rem;
    margin-bottom: calc(var(--dodo-ui-space) * 1);
    min-width: initial;
    width: 100%;
    color: var(--dodo-color-neutral-800);
    font-weight: 500;
    display: flex;
    align-items: center;
  }
</style>
