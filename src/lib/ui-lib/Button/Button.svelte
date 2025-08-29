<script lang="ts" module>
  export interface ButtonProps {
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
    color?: 'primary' | 'secondary' | 'default' | 'safe' | 'danger';
    compact?: boolean;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './Button.style.scss';
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
    color = 'default',
    compact = false,
  }: ButtonProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

{#if href}
  <Button.Root
    {href}
    {disabled}
    {ref}
    class={['Button', `color--${color}`, `${compact ? 'compact' : ''}`, theme, className].join(' ')}
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
    class={['Button', `color--${color}`, theme, className].join(' ')}
    {onclick}
    aria-label={ariaLabel}
    title={title || ariaLabel}
    {name}
    {id}
  >
    {@render children?.()}
  </Button.Root>
{/if}
