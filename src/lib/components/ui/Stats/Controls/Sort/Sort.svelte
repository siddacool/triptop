<script lang="ts" module>
  export type SortStage = 'default' | 'high';

  export type SortStageOption = {
    label: string;
    value: SortStage;
  };

  export const sortStageOptions: SortStageOption[] = [
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
  import ButtonGroup from '../ButtonGroup/ButtonGroup.svelte';

  type Props = {
    class?: string;
    value: SortStage;
  };

  let { class: className = '', value = $bindable() }: Props = $props();

  const classes = $derived(['Sort', className].filter(Boolean));
</script>

{#snippet icon(value: SortStage)}
  <span class="Icon">
    {#if value === 'high'}
      <Icon icon="mdi:arrow-top" />
    {:else}
      <Icon icon="hugeicons:menu-two-line" />
    {/if}
  </span>
{/snippet}

<ButtonGroup options={sortStageOptions} bind:value class={classes.join(' ')} aria-label="Sort">
  {#snippet customContent({ value })}
    {@render icon(value as SortStage)}
  {/snippet}
</ButtonGroup>

<style lang="scss">
  .Icon {
    font-size: 1.3rem;
    display: flex;
  }
</style>
