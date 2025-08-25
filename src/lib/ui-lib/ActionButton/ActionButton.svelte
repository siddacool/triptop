<script lang="ts">
  import './ActionButton.style.scss';
  import { Button } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { MouseEventHandler } from 'svelte/elements';

  interface ActionButtonProps {
    children?: Snippet;
    href?: string | null | undefined;
    disabled?: boolean | null | undefined;
    ref?: HTMLElement;
    class?: string;
    'aria-label'?: string;
    onclick?: MouseEventHandler<HTMLElement> | null | undefined;
  }

  const {
    children,
    class: className = '',
    'aria-label': ariaLabel,
    href,
    disabled,
    ref = $bindable<HTMLElement>(),
    onclick,
  }: ActionButtonProps = $props();
</script>

<Button.Root
  {href}
  {disabled}
  {ref}
  class={['ActionButton', className].join(' ')}
  {onclick}
  aria-label={ariaLabel}
>
  {@render children?.()}
</Button.Root>

<style lang="scss">
</style>
