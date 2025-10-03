<script lang="ts" module>
  export type ChipColor = 'primary' | 'secondary' | 'neutral' | 'safe' | 'warning' | 'danger';

  export const chipColorArray: ChipColor[] = [
    'primary',
    'secondary',
    'neutral',
    'safe',
    'warning',
    'danger',
  ];

  export interface ChipProps {
    class?: string;
    children?: Snippet;
    color?: ChipColor;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './Chip.style.scss';
  import type { Snippet } from 'svelte';

  let { class: className = '', children, color = 'primary' }: ChipProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<span class={['Chip', `color--${color}`, theme, className].join(' ')}>
  {@render children?.()}
</span>
