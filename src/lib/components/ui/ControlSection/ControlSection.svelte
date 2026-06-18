<script lang="ts">
  import type { ComponentAlignmentX } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
    controlsAlignment?: ComponentAlignmentX;
  };

  const { class: className = '', children, controlsAlignment = 'start' }: Props = $props();

  const classes = $derived(
    ['ControlSection', `controlsAlignment--${controlsAlignment}`, className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .ControlSection {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    @media (min-width: 600px) {
      flex-direction: row;
      margin-left: calc(var(--dodo-ui-space) * -1);
      margin-right: calc(var(--dodo-ui-space) * -1);
    }

    &.controlsAlignment--start {
      align-items: flex-start;
      justify-content: center;

      @media (min-width: 600px) {
        align-items: center;
        justify-content: flex-start;
      }
    }

    &.controlsAlignment--center {
      align-items: center;
      justify-content: center;

      @media (min-width: 600px) {
        align-items: center;
        justify-content: center;
      }
    }

    &.controlsAlignment--end {
      align-items: flex-end;
      justify-content: center;

      @media (min-width: 600px) {
        align-items: center;
        justify-content: flex-end;
      }
    }

    :global(.dodo-ui-Button) {
      width: 100%;
      margin-bottom: calc(var(--dodo-ui-space) * 2);

      &:last-child {
        margin-bottom: 0;
      }

      @media (min-width: 600px) {
        width: initial;
        margin: 0 var(--dodo-ui-space);
        margin-bottom: 0;
      }
    }
  }
</style>
