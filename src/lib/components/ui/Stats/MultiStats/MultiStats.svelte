<script lang="ts" module>
  export type MultiStatLevel = 'normal' | 'expert';

  export type MultiStatCustomTitleContext = {
    groupStat: GroupStats;
    level: MultiStatLevel;
  };
</script>

<script lang="ts">
  import type { GroupStats } from '$lib/stores/stats/types';
  import type { Snippet } from 'svelte';
  import Group from './Group/Group.svelte';

  type Props = {
    class?: string;
    level?: MultiStatLevel;
    groupStats: GroupStats[];
    customTitle?: Snippet<[MultiStatCustomTitleContext]>;
  };

  let { class: className = '', groupStats, level = 'normal', customTitle }: Props = $props();

  const classes = $derived(['MultiStats', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each groupStats as groupStat (groupStat.id)}
    <Group {groupStat}>
      {#if customTitle}
        {@render customTitle({ groupStat, level })}
      {:else}
        {groupStat.id}
      {/if}
    </Group>
  {/each}
</div>

<style lang="scss">
  .MultiStats {
    width: 100%;

    &.level--normal {
      display: table;

      :global(.Group) {
        display: table-row;
      }

      :global(.cell) {
        display: table-cell;
        padding: var(--dodo-ui-space);
        vertical-align: middle;
      }

      :global(.expert) {
        display: none;
      }
    }

    &.level--expert {
      display: flex;
      flex-direction: column;

      :global(.expert) {
        display: flex;
      }

      :global(.Group) {
        margin-bottom: calc(var(--dodo-ui-space) * 2);

        &:last-child {
          margin-bottom: 0;
        }
      }

      :global(.cell) {
        padding: var(--dodo-ui-space) 0;
      }

      :global(.title) {
        font-size: 1.2rem;
      }
    }
  }
</style>
