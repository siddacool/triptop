<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentThemeColors } from '@flightlesslabs/dodo-ui';
  import { Column, useThemeStore } from '@flightlesslabs/dodo-ui';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import { ToggleGroup } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type ThemeMode = 'light' | 'dark' | 'auto';

  const TRIPTOP_THEME = 'TRIPTOP_THEME';

  let themeMode = $state<ThemeMode>('auto');

  type ThemeOption = {
    value: ThemeMode;
    label: string;
  };

  const themeOptions: ThemeOption[] = [
    {
      value: 'auto',
      label: 'Auto',
    },
    {
      value: 'light',
      label: 'Light',
    },
    {
      value: 'dark',
      label: 'Dark',
    },
  ];

  function getSystemTheme(): ComponentThemeColors {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode: ThemeMode) {
    themeMode = mode;

    const newTheme = mode === 'auto' ? getSystemTheme() : mode;

    useThemeStore.updateSystemTheme(newTheme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      themeColorMeta?.setAttribute('content', newTheme === 'light' ? '#f0f8ff' : '#101828');
    }
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
      options={themeOptions as ThemeOption[]}
      value={themeMode}
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
