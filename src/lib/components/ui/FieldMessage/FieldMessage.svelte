<script lang="ts">
  import { Text, type ComponentSize, type TextProps } from '@flightlesslabs/dodo-ui';

  type Props = TextProps & {
    size?: ComponentSize;
  };

  const {
    class: className = '',
    children,
    size = 'normal',
    color = 'neutral',
    ...restProps
  }: Props = $props();

  const classes = $derived(['FieldMessage', `size--${size}`, className].filter(Boolean));
</script>

<Text {...restProps} {color} class={classes.join(' ')}>
  {@render children?.()}
</Text>

<style lang="scss">
  :global(.FieldMessage) {
    display: block;
    width: 100%;
    padding: var(--dodo-ui-space);
    padding-bottom: 0;
    color: var(--dodo-color-neutral-600);
  }

  :global(.FieldMessage.size--normal) {
    font-size: 1rem;
  }

  :global(.FieldMessage.size--large) {
    font-size: 1.2rem;
  }

  :global(.FieldMessage.size--small) {
    font-size: 0.85rem;
  }
</style>
