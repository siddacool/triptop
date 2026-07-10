import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';
import type { CurrencyCode } from '@flightlesslabs/currency';
import { DEFAULT_DATE_FORMAT, type DateFormatMode } from './date-format/types';
import type { ThemeMode } from './theme/types';
import { DEFAULT_HOME_CURRENCY } from './home-currency/types';
import { DEFAULT_LOCALE } from '$lib/features/trip/const';

const LOCAL_STORE_SETTINGS_CONFIG = 'SettingsConfig';

export type SettingsConfig = {
  theme: ThemeMode;
  dateFormat: DateFormatMode;
  locale: string;
  homeCurrency: CurrencyCode;
  enableCurrencyConversion: boolean;
};

const defaultStorageData: SettingsConfig = {
  theme: 'auto',
  dateFormat: DEFAULT_DATE_FORMAT,
  locale: DEFAULT_LOCALE,
  enableCurrencyConversion: true,
  homeCurrency: DEFAULT_HOME_CURRENCY,
};

const dataFromStorage = getLocalStoreData<SettingsConfig>('local', LOCAL_STORE_SETTINGS_CONFIG);

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

      setLocalStoreData<SettingsConfig>('local', LOCAL_STORE_SETTINGS_CONFIG, settings);
    },
  };
}

export const useSettingsStore = createSettingsStore();
