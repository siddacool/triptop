<script lang="ts" module>
  import type { GroupStats } from '$lib/features/stats/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import StatsHeader from './StatsHeader/StatsHeader.svelte';
  import type { Trip } from '$lib/features/trip/types';
  import Summaries from './Summaries.svelte';
  import DetailsExpander, {
    type LevelStage,
  } from '../Controls/DetailsExpander/DetailsExpander.svelte';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/LevelNormal/Title.svelte';

  export type StatsCardProProps = {
    class?: string;
    title?: string;
    level?: LevelStage;
    showLevel?: boolean;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
  };
</script>

<script lang="ts">
  let {
    class: className = '',
    title,
    level = $bindable('normal'),
    showLevel = false,
    groupStats,
    trip,
    customTopicTitle,
  }: StatsCardProProps = $props();

  const classes = $derived(['StatsCardPro', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="StatsCardProCard">
    <StatsHeader {title} />
    <Summaries {groupStats} {trip} {customTopicTitle} {level} />

    {#if showLevel}
      <DetailsExpander bind:value={level} />
    {/if}
  </Card>
</div>

<style lang="scss">
  .StatsCardPro {
    width: 100%;

    :global(.StatsCardProCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    :global(.DetailsExpander) {
      margin-top: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
