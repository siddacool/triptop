<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { ThemeAppBarColors, type ThemeMode } from '$lib/features/settings/types';
  import { updateSettings } from '$lib/features/settings/logic/index.svelte';

  function getSystemTheme(): ComponentThemeColors {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode: ThemeMode) {
    updateSettings({ theme: mode });

    const newTheme = mode === 'auto' ? getSystemTheme() : mode;

    useThemeStore.updateSystemTheme(newTheme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      themeColorMeta?.setAttribute(
        'content',
        newTheme === 'light' ? ThemeAppBarColors.LIGHT : ThemeAppBarColors.DARK,
      );
    }
  }

  onMount(() => {
    applyTheme(settingsStore.settings.theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (settingsStore.settings.theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  });
</script>
