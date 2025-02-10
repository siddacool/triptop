import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Silk, SilkAction } from './types';
import { useCountStore } from '../count/count.svelte';

function createSilkStore() {
  let data: Silk[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get data() {
      return data;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async init() {
      try {
        fetching = true;

        const unorderedBoned = await db.silk?.toArray();

        data = unorderedBoned?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    async update(silks: number, action: SilkAction) {
      try {
        fetching = true;

        await db.silk.add({
          _id: nanoid(),
          silks,
          action,
          createdAt: Date.now(),
        });

        await useCountStore.update(silks, action);

        const unorderedBoned = await db.silk?.toArray();

        data = unorderedBoned?.sort((a, b) => b?.createdAt - a?.createdAt);

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

export const useSilkStore = createSilkStore();
