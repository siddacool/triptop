import { getLocalStoreData } from '$lib/utils/storage';
import { ACTIVE_PAGE_TRIP } from '../const';

const dataFromStorage = getLocalStoreData<string | undefined>('local', ACTIVE_PAGE_TRIP);

function createTripPageStore() {
  let activeTrip: string | undefined = $state(dataFromStorage);
  let showSpecialFiltersSelector: boolean = $state(false);

  return {
    get activeTrip() {
      return activeTrip;
    },
    get showSpecialFiltersSelector() {
      return showSpecialFiltersSelector;
    },
    updateActiveTrip(tridId: string | undefined) {
      activeTrip = tridId;
    },
    updateShowSpecialFiltersSelector(value: boolean) {
      showSpecialFiltersSelector = value;
    },
  };
}

export const tripPageStore = createTripPageStore();
