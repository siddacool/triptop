import { browser } from '$app/environment';

const LAST_OPEN_TRIP = 'LAST_OPEN_TRIP';

function getDefaultLastOpenTrip() {
  if (!browser) {
    return undefined;
  }

  return localStorage.getItem(LAST_OPEN_TRIP) || undefined;
}

function createLocalSettingsStore() {
  let lastOpenTrip: string | undefined = $state(getDefaultLastOpenTrip());

  return {
    get lastOpenTrip() {
      return lastOpenTrip;
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
  };
}

export const useLocalSettingsStore = createLocalSettingsStore();
