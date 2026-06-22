import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
import type { ThemeMode } from './types';

const TRIPTOP_THEME = 'settings-theme';

const dataFromStorage = getLocalStoreData<ThemeMode>('local', TRIPTOP_THEME);

function createSettingsThemeStore() {
  let theme = $state(dataFromStorage || 'auto');

  return {
    get theme() {
      return theme;
    },
    updateTheme(value: ThemeMode) {
      theme = value;

      setLocalStoreData<ThemeMode>('local', TRIPTOP_THEME, value);
    },
  };
}

export const useSettingsThemeStore = createSettingsThemeStore();
