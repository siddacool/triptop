import { setLocalStoreData } from '$lib/utils/storage';
import { ACTIVE_PAGE_TRIP } from '../const';
import { tripPageStore } from '../store/page.svelte';

export function updateActiveTrip(tridId: string) {
  setLocalStoreData<string | undefined>('local', ACTIVE_PAGE_TRIP, tridId);

  tripPageStore.updateActiveTrip(tridId);
}

export function clearActiveTrip() {
  setLocalStoreData<string | undefined>('local', ACTIVE_PAGE_TRIP, undefined);

  tripPageStore.updateActiveTrip(undefined);
}

export function updateTripPageSpecialFiltersSelector(value: boolean) {
  tripPageStore.updateShowSpecialFiltersSelector(value);
}

export function clearTripPageSpecialFiltersSelector() {
  tripPageStore.updateShowSpecialFiltersSelector(false);
}
