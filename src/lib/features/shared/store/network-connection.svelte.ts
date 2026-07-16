import { browser } from '$app/environment';

function createNetworkConnectionStore() {
  let online = $state(browser ? navigator.onLine : true);

  return {
    get online() {
      return online;
    },
    update() {
      if (!browser) return;

      online = navigator.onLine;
    },
  };
}

export const networkConnectionStore = createNetworkConnectionStore();
