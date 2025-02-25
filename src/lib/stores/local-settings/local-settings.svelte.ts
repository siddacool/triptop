import { browser } from '$app/environment';

const LAST_OPEN_TRIP = 'LAST_OPEN_TRIP';
const TRIP_DETAIL_CARD_OPEN = 'TRIP_DETAIL_CARD_OPEN';

function getDefaultLastOpenTrip() {
  if (!browser) {
    return undefined;
  }

  return localStorage.getItem(LAST_OPEN_TRIP) || undefined;
}

function getDefaultTripDetailCardOpen() {
  if (!browser) {
    return true;
  }

  return localStorage.getItem(TRIP_DETAIL_CARD_OPEN) === 'false' ? false : true;
}

function createLocalSettingsStore() {
  let lastOpenTrip: string | undefined = $state(getDefaultLastOpenTrip());
  let tripDetailCardOpen: boolean = $state(getDefaultTripDetailCardOpen());

  return {
    get lastOpenTrip() {
      return lastOpenTrip;
    },
    get tripDetailCardOpen() {
      return tripDetailCardOpen;
    },
    async updateLastOpenTrip(tripId: string) {
      lastOpenTrip = tripId;

      if (browser) {
        localStorage.setItem(LAST_OPEN_TRIP, tripId);
      }

      return Promise.resolve();
    },
    async resetLastOpenTrip() {
      lastOpenTrip = undefined;

      if (browser) {
        localStorage.removeItem(LAST_OPEN_TRIP);
      }

      return Promise.resolve();
    },
    toggleTripDetailCardOpen() {
      if (browser) {
        localStorage.setItem(TRIP_DETAIL_CARD_OPEN, `${!tripDetailCardOpen}`);
      }

      tripDetailCardOpen = !tripDetailCardOpen;

      return Promise.resolve();
    },
  };
}

export const useLocalSettingsStore = createLocalSettingsStore();
