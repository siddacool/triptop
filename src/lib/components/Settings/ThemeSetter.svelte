<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
  import { useSettingsThemeStore } from '$lib/stores/settings/theme/theme.svelte';
  import type { ThemeMode } from '$lib/stores/settings/theme/types';

  function getSystemTheme(): ComponentThemeColors {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode: ThemeMode) {
    useSettingsThemeStore.updateTheme(mode);

    const newTheme = mode === 'auto' ? getSystemTheme() : mode;

    useThemeStore.updateSystemTheme(newTheme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      themeColorMeta?.setAttribute('content', newTheme === 'light' ? '#f0f8ff' : '#101828');
    }
  }

  onMount(() => {
    applyTheme(useSettingsThemeStore.theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (useSettingsThemeStore.theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  });
</script>
