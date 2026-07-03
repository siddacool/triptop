<script lang="ts" module>
  import type { GroupStats } from '$lib/stores/stats/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import Topics, { type TopicsCustomTopicTitleContext } from './Topics.svelte';
  import StatsHeader from './StatsHeader/StatsHeader.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import type { StatsCardProLevel } from './StatsHeader/Levels.svelte';
  import type { StatsCardProSort } from './StatsHeader/Sort.svelte';

  export type StatsCardProProps = {
    class?: string;
    title?: string;
    level?: StatsCardProLevel;
    sort?: StatsCardProSort;
    showLevel?: boolean;
    showSort?: boolean;
    trip: Trip;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[TopicsCustomTopicTitleContext]>;
  };
</script>

<script lang="ts">
  let {
    class: className = '',
    title,
    level = $bindable('normal'),
    showLevel = false,
    showSort = false,
    sort = $bindable('default'),
    ...restProps
  }: StatsCardProProps = $props();

  const classes = $derived(['StatsCardPro', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="StatsCardProCard">
    <StatsHeader {showLevel} {showSort} {title} bind:level bind:sort />
    <Topics {...restProps} {level} />
  </Card>
</div>

<style lang="scss">
  .StatsCardPro {
    width: 100%;

    :global(.StatsCardProCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
