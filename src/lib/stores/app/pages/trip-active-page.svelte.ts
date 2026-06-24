import { getLocalStoreData, setLocalStoreData } from '$lib/helpers/storage';

const LOCAL_STORE_ACTIVE_TRIP = 'TripActive';

const dataFromStorage = getLocalStoreData<string | undefined>('local', LOCAL_STORE_ACTIVE_TRIP);

function createTripActivePageStore() {
  let activeTrip: string | undefined = $state(dataFromStorage);

  return {
    get activeTrip() {
      return activeTrip;
    },
    updateActiveTrip(tridId: string) {
      activeTrip = tridId;

      setLocalStoreData<string | undefined>('local', LOCAL_STORE_ACTIVE_TRIP, tridId);
    },
    reset() {
      activeTrip = undefined;

      setLocalStoreData<string | undefined>('local', LOCAL_STORE_ACTIVE_TRIP, undefined);
    },
  };
}

export const useTripActivePageStore = createTripActivePageStore();
