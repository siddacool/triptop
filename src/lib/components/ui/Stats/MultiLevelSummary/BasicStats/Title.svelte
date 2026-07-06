<script lang="ts" module>
  export type StatsTopicTitleContext = {
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    level: LevelStage;
  };
</script>

<script lang="ts">
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { LevelStage } from '../../Controls/DetailsExpander/DetailsExpander.svelte';

  type Props = {
    class?: string;
    topicTitle: string;
    level: LevelStage;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
    detailed?: boolean;
  };

  let {
    class: className = '',
    level,
    customTopicTitle,
    topicTitle,
    expenseSummary,
    detailed,
  }: Props = $props();

  const classes = $derived(['Title', `${detailed ? 'detailed' : ''}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <div class="box">
    {#if customTopicTitle}
      {@render customTopicTitle({ topicTitle, expenseSummary, level })}
    {:else}
      {topicTitle}
    {/if}
  </div>
</div>

<style lang="scss">
  .Title {
    white-space: nowrap;
    font-weight: 400;
    padding-right: var(--dodo-ui-space);
    min-width: 60px;
    color: var(--dodo-color-neutral-800);

    &.detailed {
      font-size: 1.1rem;
      margin-bottom: calc(var(--dodo-ui-space) * 1);
      min-width: initial;
      width: 100%;
    }
  }

  .box {
    display: flex;
    align-items: center;
  }
</style>
