<script lang="ts" module>
  import type { GroupStats } from '$lib/stores/stats/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import StatsHeader from './StatsHeader/StatsHeader.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import type { StatsTopicTitleContext } from '../MultiLevelSummary/BasicStats/Title.svelte';
  import Summaries from './Summaries.svelte';
  import DetailsExpander, {
    type LevelStage,
  } from '../Controls/DetailsExpander/DetailsExpander.svelte';

  export type StatsCardProProps = {
    class?: string;
    title?: string;
    level?: LevelStage;
    showLevel?: boolean;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[StatsTopicTitleContext]>;
    showBasicStats?: boolean;
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
    showBasicStats = true,
  }: StatsCardProProps = $props();

  const classes = $derived(['StatsCardPro', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="StatsCardProCard">
    <StatsHeader {title} />
    <Summaries {groupStats} {trip} {customTopicTitle} {level} {showBasicStats} />

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
