import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
import type { Category } from '../category/types';
import type { ThemeMode } from './theme/types';

export type SettingsBase = {
  search?: string;
};

export type SettingsSpecial = {
  category?: Category;
  minDate?: string;
  maxDate?: string;
};

export type SettingsConfig = {
  theme: ThemeMode;
};

const defaultStorageData: SettingsConfig = {
  theme: 'auto',
};

const dataFromStorage = getLocalStoreData<SettingsConfig>('local', 'SettingsConfig');

function createSettingsStore() {
  let settings: SettingsConfig = $state({ ...defaultStorageData, ...dataFromStorage });

  return {
    get settings() {
      return settings;
    },
    updateSettings(value: Partial<SettingsConfig>) {
      const newConfig = {
        ...settings,
        ...value,
      };

      settings = newConfig;

      setLocalStoreData<SettingsConfig>('local', 'SettingsConfig', settings);
    },
  };
}

export const useSettingsStore = createSettingsStore();
