<script lang="ts">
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { Column, FormField, useThemeStore } from '@flightlesslabs/dodo-ui';
  import { ToggleGroup } from '@flightlesslabs/dodo-ui-bits';
  import { ThemeAppBarColors } from '$lib/features/settings/types';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { updateSettings } from '$lib/features/settings/logic/index.svelte';
  import type { ThemeMode } from '$lib/features/settings/types';
  import { themeOptions } from '$lib/features/settings/config';

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
</script>

<Column>
  <FormField label="Theme">
    <ToggleGroup
      type="single"
      options={themeOptions}
      value={settingsStore.settings.theme}
      onValueChange={(val) => applyTheme(val as ThemeMode)}
      attached
      inactiveButtonProps={{ outline: true }}
    />
  </FormField>
</Column>
