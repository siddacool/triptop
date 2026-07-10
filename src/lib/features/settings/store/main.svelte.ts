import { getLocalStoreData } from '$lib/utils/storage';
import type { CurrencyCode } from '@flightlesslabs/currency';
import { DEFAULT_LOCALE } from '$lib/features/trip/const';
import type { DateFormatMode, ThemeMode } from '../types';
import { DEFAULT_DATE_FORMAT, DEFAULT_HOME_CURRENCY, LOCAL_STORE_SETTINGS_CONFIG } from '../const';

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
    update(value: SettingsConfig) {
      settings = value;
    },
  };
}

export const settingsStore = createSettingsStore();
