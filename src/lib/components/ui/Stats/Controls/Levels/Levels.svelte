<script lang="ts" module>
  export type LevelStage = 'normal' | 'expert';

  export type LevelStageOption = {
    label: string;
    value: LevelStage;
  };

  export const levelStageOptions: LevelStageOption[] = [
    {
      label: 'Normal',
      value: 'normal',
    },
    {
      label: 'Expert',
      value: 'expert',
    },
  ];
</script>

<script lang="ts">
  import Icon from '@iconify/svelte';
  import ButtonGroup from '../ButtonGroup/ButtonGroup.svelte';

  type Props = {
    class?: string;
    value: LevelStage;
  };

  let { class: className = '', value = $bindable() }: Props = $props();

  const classes = $derived(['Levels', className].filter(Boolean));
</script>

{#snippet icon(value: LevelStage)}
  <span class="Icon">
    {#if value === 'normal'}
      <Icon icon="ix:prio-low" />
    {:else}
      <Icon icon="ix:prio-middle" />
    {/if}
  </span>
{/snippet}

<ButtonGroup
  options={levelStageOptions}
  bind:value
  class={classes.join(' ')}
  aria-label="Statistics level"
>
  {#snippet customContent({ value })}
    {@render icon(value as LevelStage)}
  {/snippet}
</ButtonGroup>

<style lang="scss">
  .Icon {
    font-size: 1.2rem;
    display: flex;
  }
</style>
