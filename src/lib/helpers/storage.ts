import { browser } from '$app/env';

export const TRIPTOP_LOCAL_STORAGE = 'TRIPTOP_LOCAL_STORAGE';

export type StorageType = 'session' | 'local';

export type StorageValue = Record<string, string | boolean | null | number | undefined>;

export function getLocalStore(storageType: StorageType): StorageValue {
  if (!browser) {
    return {};
  }

  const storeRaw =
    storageType === 'local'
      ? localStorage.getItem(TRIPTOP_LOCAL_STORAGE)
      : sessionStorage.getItem(TRIPTOP_LOCAL_STORAGE);

  const store = storeRaw ? JSON.parse(storeRaw) : {};

  return store;
}

export function setLocalStore(storageType: StorageType, data: StorageValue): StorageValue {
  if (!browser) {
    return {};
  }

  const storeData = data ? JSON.stringify(data) : '{}';

  if (storageType === 'local') {
    localStorage.setItem(TRIPTOP_LOCAL_STORAGE, storeData);
  } else {
    sessionStorage.setItem(TRIPTOP_LOCAL_STORAGE, storeData);
  }

  return getLocalStore(storageType);
}

export function getLocalStoreData<T>(storageType: StorageType, fieldName: string): T | undefined {
  const data = getLocalStore(storageType);

  if (
    data[fieldName] ||
    data[fieldName] === 0 ||
    data[fieldName] === false ||
    data[fieldName] === null
  ) {
    return data[fieldName] as T;
  }

  return undefined;
}

export function setLocalStoreData<T>(
  storageType: StorageType,
  fieldName: string,
  data: T,
): T | undefined {
  const storageData = getLocalStore(storageType);

  storageData[fieldName] = data as StorageType;

  setLocalStore(storageType, storageData);

  return getLocalStoreData(storageType, fieldName);
}
