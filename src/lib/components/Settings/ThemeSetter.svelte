<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  import type { ThemeMode } from '$lib/stores/settings/theme/types';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';

  function getSystemTheme(): ComponentThemeColors {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode: ThemeMode) {
    useSettingsStore.updateSettings({ theme: mode });

    const newTheme = mode === 'auto' ? getSystemTheme() : mode;

    useThemeStore.updateSystemTheme(newTheme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      themeColorMeta?.setAttribute('content', newTheme === 'light' ? '#ddd6ff' : '#2f0d68');
    }
  }

  onMount(() => {
    applyTheme(useSettingsStore.settings.theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (useSettingsStore.settings.theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  });
</script>
