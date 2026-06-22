<script lang="ts">
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { Column, useThemeStore } from '@flightlesslabs/dodo-ui';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import { ToggleGroup } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { useSettingsThemeStore } from '$lib/stores/settings/theme/theme.svelte';
  import { themeOptions } from '$lib/stores/settings/theme/types';
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
</script>

{#snippet contentIcon(value: ThemeMode)}
  <span class="Icon">
    {#if value === 'light'}
      <Icon icon="tdesign:sunny" />
    {:else if value === 'dark'}
      <Icon icon="tdesign:moon" />
    {:else}
      <Icon icon="proicons:dark-theme" />
    {/if}
  </span>
{/snippet}

<Column>
  <FieldValue label="Theme">
    <ToggleGroup
      type="single"
      options={themeOptions}
      value={useSettingsThemeStore.theme}
      onValueChange={(val) => applyTheme(val as ThemeMode)}
      attached
      inactiveButtonProps={{ outline: true }}
    >
      {#snippet customContent({ value, label })}
        {@render contentIcon(value as ThemeMode)}
        {label}
      {/snippet}
    </ToggleGroup>
  </FieldValue>
</Column>

<style lang="scss">
  .Icon {
    font-size: 1.3rem;
    display: inline-flex;
    margin-right: 6px;
  }
</style>
