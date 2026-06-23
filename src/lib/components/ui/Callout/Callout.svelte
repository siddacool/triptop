<script lang="ts">
  import { Card, Text, type ComponentColor, type ComponentSize } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    color: ComponentColor;
    children?: Snippet;
    class?: string;
    size?: ComponentSize;
  };

  const { class: className = '', children, color, size = 'normal' }: Props = $props();

  const classes = $derived(['Callout', `size--${size}`, className].filter(Boolean));
</script>

<Card class={classes.join(' ')} {color} shadow={0}>
  <Text {color}>
    {@render children?.()}
  </Text>
</Card>

<style lang="scss">
  :global(.Callout) {
    &.size--normal {
      padding: var(--dodo-ui-space);
      font-size: 1rem;
    }

    &.size--small {
      padding: 6px;
      font-size: 0.9rem;
    }

    &.size--large {
      padding: var(--dodo-ui-space);
      font-size: 1.2rem;
    }
  }
</style>
