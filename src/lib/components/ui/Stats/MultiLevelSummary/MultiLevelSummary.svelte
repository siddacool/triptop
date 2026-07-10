<script lang="ts" module>
  import type { ExpenseSummary } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { Trip } from '$lib/features/trip/types';
  import type { LevelStage } from '../Controls/DetailsExpander/DetailsExpander.svelte';
  import LevelNormal from './LevelNormal/LevelNormal.svelte';
  import type { StatsTopicTitleContext } from './LevelNormal/Title.svelte';
  import LevelExpert from './LevelExpert/LevelExpert.svelte';

  export type MultiLevelSummaryProps = {
    class?: string;
    trip: Trip;
    level: LevelStage;
    topicTitle: string;
    expenseSummary: ExpenseSummary;
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
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
  }: MultiLevelSummaryProps = $props();
</script>

{#if level === 'normal'}
  <LevelNormal {expenseSummary} {topicTitle} {customTopicTitle} class={className} />
{:else}
  <LevelExpert {expenseSummary} {trip} {topicTitle} {customTopicTitle} class={className} />
{/if}
