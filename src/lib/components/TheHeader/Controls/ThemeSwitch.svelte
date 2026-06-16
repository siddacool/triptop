<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { Button, useThemeStore } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type ThemeMode = 'light' | 'dark' | 'auto';

  const TRIPTOP_THEME = 'TRIPTOP_THEME';

  let themeMode = $state<ThemeMode>('auto');

  function getSystemTheme(): ComponentThemeColors {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode: ThemeMode) {
    themeMode = mode;

    useThemeStore.updateSystemTheme(mode === 'auto' ? getSystemTheme() : mode);
  }

  function handleThemeSwitch() {
    const themes: ThemeMode[] = ['light', 'dark', 'auto'];

    const nextIndex = (themes.indexOf(themeMode) + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    applyTheme(nextTheme);
    localStorage.setItem(TRIPTOP_THEME, nextTheme);
  }

  onMount(() => {
    const storedTheme = localStorage.getItem(TRIPTOP_THEME);

    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'auto') {
      applyTheme(storedTheme);
    } else {
      applyTheme('auto');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (themeMode === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  });
</script>

<Button
  aria-label="Theme Switch"
  class="ThemeSwitch"
  variant="text"
  roundness="pill"
  title={`Theme: ${themeMode}`}
  onclick={handleThemeSwitch}
>
  {#if themeMode === 'dark'}
    <Icon icon="akar-icons:moon" />
  {:else if themeMode === 'light'}
    <Icon icon="akar-icons:sun" />
  {:else}
    <Icon icon="proicons:dark-theme" />
  {/if}
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.ThemeSwitch) {
    font-size: 1.6rem;
  }
</style>
