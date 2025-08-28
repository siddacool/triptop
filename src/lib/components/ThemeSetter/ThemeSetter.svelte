<script lang="ts">
  import { browser } from '$app/environment';
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  function getSystemTheme(): AppColorSchemes {
    if (!browser) {
      return AppColorSchemes.LIGHT;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (mediaQuery.matches) {
      return AppColorSchemes.DARK;
    } else {
      return AppColorSchemes.LIGHT;
    }
  }

  $effect(() => {
    const bodyContainer = document.querySelector('body');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const sytemTheme = getSystemTheme();

    if (sytemTheme === AppColorSchemes.DARK) {
      if (bodyContainer) {
        bodyContainer.classList.add('dodo-theme--dark');
      }

      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#0f172b');
      }

      useThemeStore.update(AppColorSchemes.DARK);
    } else {
      if (bodyContainer) {
        bodyContainer.classList.remove('dodo-theme--dark');
      }

      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#f0f8ff');
      }

      useThemeStore.update(AppColorSchemes.LIGHT);
    }
  });
</script>
