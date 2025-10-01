<script lang="ts" module>
  export interface ChipProps {
    class?: string;
    children?: Snippet;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './Chip.style.scss';
  import type { Snippet } from 'svelte';

  let { class: className = '', children }: ChipProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<span class={['Chip', theme, className].join(' ')}>
  {@render children?.()}
</span>
