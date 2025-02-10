import { browser } from '$app/environment';
import { generateCookieName } from '$lib/helpers/cookie-maker';
import { SilkAction } from '../silk/types';

const cookieName = generateCookieName('COUNT');

function saveCookie(count: number) {
  if (!browser) {
    return;
  }

  localStorage.setItem(cookieName, `${count}`);
}

function getCookie() {
  if (!browser) {
    return 0;
  }

  return Number(localStorage.getItem(cookieName) || '0');
}

function createCountStore() {
  let count: number = $state(getCookie());
  let fetching: boolean = $state(false);

  return {
    get count() {
      return count;
    },
    get fetching() {
      return fetching;
    },
    async update(silks: number, action: SilkAction) {
      try {
        fetching = true;

        const newCount = action === SilkAction.ADD ? count + silks : count - silks;

        count = newCount;

        saveCookie(newCount);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const useCountStore = createCountStore();
