<script lang="ts">
  import { Button, type ButtonProps } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = ButtonProps & {
    color?: never;
    variant?: never;
    icon?: Snippet;
  };

  let { class: className, ...restProps }: Props = $props();

  const classes = $derived(['PrimaryButton', className].filter(Boolean));
</script>

<Button {...restProps} class={classes.join(' ')} color="primary" variant="solid" />

<style lang="scss">
  :global(.PrimaryButton svg) {
    color: var(--dodo-color-base-yellow-300);
  }
</style>
