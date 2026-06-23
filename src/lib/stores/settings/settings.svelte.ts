import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
import type { DateFormatMode } from './date-format/types';
import type { ThemeMode } from './theme/types';

export type SettingsConfig = {
  theme: ThemeMode;
  dateFormat: DateFormatMode;
};

const defaultStorageData: SettingsConfig = {
  theme: 'auto',
  dateFormat: 'DD/MM/YYYY',
};

const dataFromStorage = getLocalStoreData<SettingsConfig>('local', 'SettingsConfig');

function createSettingsStore() {
  let settings: SettingsConfig = $state({ ...defaultStorageData, ...dataFromStorage });

  return {
    get settings() {
      return settings;
    },
    fetchSettings() {
      settings = { ...defaultStorageData, ...dataFromStorage };
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
