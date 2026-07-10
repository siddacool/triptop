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
  type Props = {
    class?: string;
    value: LevelStage;
  };

  let { class: className = '', value = $bindable() }: Props = $props();

  const classes = $derived(['DetailsExpander', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if value === 'expert'}
    <button onclick={() => (value = 'normal')}>Show less details</button>
  {:else}
    <button onclick={() => (value = 'expert')}>Show more details</button>
  {/if}
</div>

<style lang="scss">
  .DetailsExpander {
    button {
      background-color: transparent;
      color: inherit;
      font-size: 1rem;
      font-family: inherit;
      border: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      padding: 6px;
      padding-left: 0;
      color: var(--dodo-color-secondary-600);
      transition: color 100ms;

      &:hover {
        color: var(--dodo-color-secondary-700);
      }

      &:active {
        color: var(--dodo-color-secondary-800);
      }
    }
  }
</style>
