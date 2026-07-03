<script lang="ts" module>
  export type StatsCardProLevel = 'normal' | 'amateur' | 'expert';

  export type StatsCardProLevelOption = {
    label: string;
    value: StatsCardProLevel;
  };

  export const statsCardProLevelOptions: StatsCardProLevelOption[] = [
    {
      label: 'Normal',
      value: 'normal',
    },
    {
      label: 'Amateur',
      value: 'amateur',
    },
    {
      label: 'Expert',
      value: 'expert',
    },
  ];
</script>

<script lang="ts">
  import Icon from '@iconify/svelte';
  import ButtonGroup from './ButtonGroup/ButtonGroup.svelte';

  type Props = {
    class?: string;
    level: StatsCardProLevel;
  };

  let { class: className = '', level = $bindable() }: Props = $props();

  const classes = $derived(['Levels', className].filter(Boolean));
</script>

{#snippet icon(value: StatsCardProLevel)}
  <span class="Icon">
    {#if value === 'normal'}
      <Icon icon="ix:prio-low" />
    {:else if value === 'amateur'}
      <Icon icon="ix:prio-middle" />
    {:else}
      <Icon icon="ix:prio-high" />
    {/if}
  </span>
{/snippet}

<ButtonGroup
  options={statsCardProLevelOptions}
  bind:value={level}
  class={classes.join(' ')}
  aria-label="Statistics level"
>
  {#snippet customContent({ value })}
    {@render icon(value as StatsCardProLevel)}
  {/snippet}
</ButtonGroup>

<style lang="scss">
  .Icon {
    font-size: 1.2rem;
    display: flex;
  }
</style>
