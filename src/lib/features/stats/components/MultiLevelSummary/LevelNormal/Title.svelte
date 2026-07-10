<script lang="ts" module>
  export type StatsTopicTitleContext = {
    topicTitle: string;
    expenseSummary: ExpenseSummary;
  };
</script>

<script lang="ts">
  import type { ExpenseSummary } from '$lib/features/stats/types';
  import type { Snippet } from 'svelte';

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
  <div class="box">
    {#if customTopicTitle}
      {@render customTopicTitle({ topicTitle, expenseSummary })}
    {:else}
      {topicTitle}
    {/if}
  </div>
</div>

<style lang="scss">
  .Title {
    display: table-cell;
    font-weight: 400;
    color: var(--dodo-color-neutral-800);
    padding: var(--dodo-ui-space);
    padding-left: 0;
    width: 1%; /* Shrinks to minimum required width */
    white-space: nowrap; /* Prevent wrapping if desired */
  }

  .box {
    display: flex;
    align-items: center;
  }
</style>
