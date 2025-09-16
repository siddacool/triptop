<script lang="ts" module>
  export interface TextButtonProps {
    children?: Snippet;
    href?: string | null | undefined;
    disabled?: boolean | null | undefined;
    ref?: HTMLElement;
    class?: string;
    title?: string;
    name?: string;
    id?: string;
    'aria-label'?: string;
    onclick?: MouseEventHandler<HTMLElement> | null | undefined;
    type?: 'button' | 'submit' | 'reset';
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './TextButton.style.scss';
  import { Button } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import type { MouseEventHandler } from 'svelte/elements';

  const {
    children,
    class: className = '',
    title,
    'aria-label': ariaLabel,
    href,
    disabled,
    ref = $bindable<HTMLElement>(),
    onclick,
    type = 'button',
    name,
    id,
  }: TextButtonProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

{#if href}
  <Button.Root
    {href}
    {disabled}
    {ref}
    class={['TextButton', , theme, className].join(' ')}
    {onclick}
    aria-label={ariaLabel}
    title={title || ariaLabel}
    {id}
  >
    {@render children?.()}
  </Button.Root>
{:else}
  <Button.Root
    {type}
    {disabled}
    {ref}
    class={['TextButton', theme, className].join(' ')}
    {onclick}
    aria-label={ariaLabel}
    title={title || ariaLabel}
    {name}
    {id}
  >
    {@render children?.()}
  </Button.Root>
{/if}
