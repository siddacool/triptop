<script lang="ts">
  import { browser } from '$app/environment';
  import { AppColorSchemes } from '$lib/stores/local-settings/types';

  export function getSystemTheme(): AppColorSchemes {
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

    if (bodyContainer) {
      bodyContainer.dataset.theme = sytemTheme;
    }

    if (metaThemeColor) {
      if (sytemTheme === AppColorSchemes.DARK) {
        metaThemeColor.setAttribute('content', '#161722');
      } else {
        metaThemeColor.setAttribute('content', '#fff');
      }
    }
  });
</script>
