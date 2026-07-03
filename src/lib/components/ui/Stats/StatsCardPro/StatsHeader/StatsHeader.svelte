<script lang="ts">
  import Levels, { type StatsCardProLevel } from './Levels.svelte';
  import type { StatsCardProSort } from './Sort.svelte';
  import Sort from './Sort.svelte';

  type Props = {
    class?: string;
    title?: string;
    showLevel: boolean;
    showSort: boolean;
    sort: StatsCardProSort;
    level: StatsCardProLevel;
  };

  let {
    class: className = '',
    title,
    level = $bindable(),
    showLevel,
    showSort,
    sort = $bindable(),
  }: Props = $props();

  const classes = $derived(['StatsHeader', `level--${level}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if title}
    <h2>{title}</h2>
  {/if}

  <div class="control">
    {#if showSort}
      <Sort bind:sort />
    {/if}
    {#if showLevel}
      <Levels bind:level />
    {/if}
  </div>
</div>

<style lang="scss">
  .StatsHeader {
    color: var(--dodo-color-neutral-800);
    margin-bottom: calc(var(--dodo-ui-space) * 2);
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    h2 {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
    }

    .control {
      margin-left: auto;
      margin-right: calc(var(--dodo-ui-space) * -1);
      display: flex;
    }
  }
</style>
