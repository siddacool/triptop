<script lang="ts" module>
  import type { GroupStats } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import Group from './Group/Group.svelte';
  import type { StatsCardProLevel } from './StatsCardPro.svelte';

  export type TopicsCustomTopicTitleContext = {
    groupStat: GroupStats;
    level: StatsCardProLevel;
  };
</script>

<script lang="ts">
  type Props = {
    class?: string;
    level: StatsCardProLevel;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[TopicsCustomTopicTitleContext]>;
  };

  let { class: className = '', groupStats, level, customTopicTitle }: Props = $props();

  const classes = $derived(['Topics', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each groupStats as groupStat (groupStat.id)}
    <Group {groupStat}>
      {#if customTopicTitle}
        {@render customTopicTitle({ groupStat, level })}
      {:else}
        {groupStat.id}
      {/if}
    </Group>
  {/each}
</div>

<style lang="scss">
  .Topics {
    width: 100%;
  }
</style>
