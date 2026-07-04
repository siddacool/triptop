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
  import type { LevelStage } from '../../Controls/Levels/Levels.svelte';

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

  const classes = $derived(
    ['cell', 'Title', `${detailed ? 'detailed' : ''}`, className].filter(Boolean),
  );
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
    font-weight: 500;
    padding-left: 0;
    min-width: 120px;

    &.detailed {
      font-size: 1.2rem;
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
