<script lang="ts" module>
  export type StatsCardProSort = 'default' | 'high';

  export type StatsCardProSortOption = {
    label: string;
    value: StatsCardProSort;
  };

  export const statsCardProSortOptions: StatsCardProSortOption[] = [
    {
      label: 'Default',
      value: 'default',
    },
    {
      label: 'High',
      value: 'high',
    },
  ];
</script>

<script lang="ts">
  import Icon from '@iconify/svelte';
  import ButtonGroup from './ButtonGroup/ButtonGroup.svelte';

  type Props = {
    class?: string;
    sort: StatsCardProSort;
  };

  let { class: className = '', sort = $bindable() }: Props = $props();

  const classes = $derived(['Sort', className].filter(Boolean));
</script>

{#snippet icon(value: StatsCardProSort)}
  <span class="Icon">
    {#if value === 'high'}
      <Icon icon="mdi:arrow-top" />
    {:else}
      <Icon icon="hugeicons:menu-two-line" />
    {/if}
  </span>
{/snippet}

<ButtonGroup
  options={statsCardProSortOptions}
  bind:value={sort}
  class={classes.join(' ')}
  aria-label="Sort"
>
  {#snippet customContent({ value })}
    {@render icon(value as StatsCardProSort)}
  {/snippet}
</ButtonGroup>

<style lang="scss">
  .Icon {
    font-size: 1.3rem;
    display: flex;
  }
</style>
