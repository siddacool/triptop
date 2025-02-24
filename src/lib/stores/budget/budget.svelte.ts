import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Budget } from './types';
import type { PaymentModes } from '../payment-mode/types';

async function getBudget(idToFind: string) {
  try {
    const trip = await db.budget.where({ _id: idToFind }).first();

    return Promise.resolve(trip);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createBudgetStore() {
  let data: Budget[] = $state([]);
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

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    async add(tripId: string, name: string, amount: number, paymentMode: PaymentModes) {
      try {
        fetching = true;

        await db.budget.add({
          _id: nanoid(),
          name,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          paymentMode,
          amount,
          tripId,
        });

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, name: string, amount: number, paymentMode: PaymentModes) {
      try {
        fetching = true;

        const target = await getBudget(idToUpdate);

        console.log(target);

        if (!target) {
          throw Error('Budget:update: budget is missing');
        }

        await db.budget.update(target.id, {
          name: name.trim(),
          amount,
          paymentMode,
          updatedAt: Date.now(),
        });

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;

        const target = await getBudget(idToDelete);

        if (!target) {
          throw Error('Budget:delete: budget is missing');
        }

        await db.budget.delete(target.id);

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async deleteAllBudgetsFromTrip(tripId: string) {
      try {
        fetching = true;

        const relatedBudget = await db.budget?.where({ tripId }).toArray();

        const relatedBudgetKeys = relatedBudget.map((item) => item.id);

        if (!relatedBudgetKeys.length) {
          return Promise.resolve();
        }

        await db.budget.bulkDelete(relatedBudgetKeys);

        const unordered = await db.budget?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

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

export const useBudgetStore = createBudgetStore();
