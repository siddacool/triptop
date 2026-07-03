<script lang="ts" module>
  import type { GroupStats } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import type { StatsCardProLevel } from './StatsHeader/Levels.svelte';

  export type TopicsCustomTopicTitleContext = {
    groupStat: GroupStats;
    level: StatsCardProLevel;
  };
</script>

<script lang="ts">
  import Topic from './Topic/Topic.svelte';
  import type { Trip } from '$lib/stores/trip/types';

  type Props = {
    class?: string;
    level: StatsCardProLevel;
    groupStats: GroupStats[];
    customTopicTitle?: Snippet<[TopicsCustomTopicTitleContext]>;
    trip: Trip;
  };

  let { class: className = '', groupStats, level, customTopicTitle, trip }: Props = $props();

  const classes = $derived(['Topics', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each groupStats as groupStat (groupStat.id)}
    <Topic {groupStat} {trip}>
      {#if customTopicTitle}
        {@render customTopicTitle({ groupStat, level })}
      {:else}
        {groupStat.id}
      {/if}
    </Topic>
  {/each}
</div>

<style lang="scss">
  .Topics {
    width: 100%;

    &.level--normal {
      display: table;

      :global(.Topic) {
        display: table-row;
      }

      :global(.topic-cell) {
        display: table-cell;
        padding: var(--dodo-ui-space);
        vertical-align: middle;
      }

      :global(.expert) {
        display: none;
      }

      :global(.amateur) {
        display: none;
      }
    }

    &.level--amateur,
    &.level--expert {
      display: flex;
      flex-direction: column;

      :global(.amateur) {
        display: flex;
      }

      :global(.Topic) {
        margin-bottom: calc(var(--dodo-ui-space) * 1);

        &:last-child {
          margin-bottom: 0;
        }
      }

      :global(.topic-cell) {
        padding: var(--dodo-ui-space) 0;
      }

      :global(.Title) {
        font-size: 1.2rem;
      }
    }

    &.level--expert {
      :global(.Topic) {
        margin-bottom: calc(var(--dodo-ui-space) * 2);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
