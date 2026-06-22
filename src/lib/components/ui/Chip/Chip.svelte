<script lang="ts">
  import type { TextColor } from '@flightlesslabs/dodo-ui';
  import { Text } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
    color?: TextColor;
  };

  const { class: className = '', children, color }: Props = $props();

  const classes = $derived(['Chip', `color--${color}`, className].filter(Boolean));
</script>

<Text class={classes.join(' ')} {color}>
  {@render children?.()}
</Text>

<style lang="scss">
  :global(.Chip) {
    display: inline-flex;
    color: var(--dodo-color-neutral-900);
    padding: 5px 7px;
    border: 1px solid var(--dodo-color-neutral-900);
    font-size: 0.8rem;
    border-radius: var(--dodo-ui-element-roundness-2);

    @media (min-width: 600px) {
      font-size: 0.9rem;
    }

    &.color--primary {
      color: var(--dodo-ui-Text-primary);
      border-color: var(--dodo-ui-Text-primary);
    }

    &.color--secondary {
      color: var(--dodo-ui-Text-secondary);
      border-color: var(--dodo-ui-Text-secondary);
    }

    &.color--neutral {
      color: var(--dodo-ui-Text-neutral);
      border-color: var(--dodo-ui-Text-neutral);
    }

    &.color--warning {
      color: var(--dodo-ui-Text-warning);
      border-color: var(--dodo-ui-Text-warning);
    }

    &.color--danger {
      color: var(--dodo-ui-Text-danger);
      border-color: var(--dodo-ui-Text-danger);
    }
  }
</style>
