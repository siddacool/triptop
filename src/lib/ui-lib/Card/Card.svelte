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

  const shodowClass = interactive ? 'dodo-shadow-3' : 'dodo-shadow-2';
</script>

<div bind:this={ref} class:interactive class={['Card', shodowClass, theme, className].join(' ')}>
  {@render children?.()}
</div>
