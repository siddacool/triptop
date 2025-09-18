<script lang="ts" module>
  export interface DividerProps {
    /** Custom css class*/
    class?: string;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './Divider.style.scss';

  let { class: className = '' }: DividerProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<hr class={['Divider', theme, className].join(' ')} />
