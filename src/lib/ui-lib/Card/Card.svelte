<script lang="ts" module>
  export interface CardProps {
    children?: Snippet;
    ref?: HTMLDivElement;
    class?: string;
    interactive?: boolean;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import type { Snippet } from 'svelte';
  import './Card.style.scss';

  let {
    children,
    class: className = '',
    ref = $bindable<HTMLDivElement>(),
    interactive = false,
  }: CardProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<div
  bind:this={ref}
  class:interactive
  class={['Card', 'dodo-shadow-2', theme, className].join(' ')}
>
  {@render children?.()}
</div>
