import { setLocalStoreData } from '$lib/utils/storage';
import { LOCAL_STORE_SETTINGS_CONFIG } from '../const';
import { settingsStore, type SettingsConfig } from '../store/main.svelte';

export function updateSettings(value: Partial<SettingsConfig>) {
  const oldSettings = settingsStore.settings;
  const newSettings = {
    ...oldSettings,
    ...value,
  };

  setLocalStoreData<SettingsConfig>('local', LOCAL_STORE_SETTINGS_CONFIG, newSettings);

  settingsStore.update(newSettings);
}
