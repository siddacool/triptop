import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Category, Expense } from './types';
import type { PaymentModes } from '../payment-mode/types';

async function getExpense(idToFind: string) {
  try {
    const trip = await db.expense.where({ _id: idToFind }).first();

    return Promise.resolve(trip);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createExpenseStore() {
  let data: Expense[] = $state([]);
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

        const unordered = await db.expense?.toArray();

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
    async add(
      name: string,
      amount: number,
      tripId: string,
      time: Date,
      date: Date,
      category?: Category,
      budgetId?: string,
      paymentMode?: PaymentModes,
    ) {
      try {
        fetching = true;

        await db.expense.add({
          _id: nanoid(),
          name,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          amount,
          tripId,
          budgetId,
          category,
          date,
          time,
          paymentMode,
        });

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(
      idToUpdate: string,
      name: string,
      amount: number,
      time: Date,
      date: Date,
      category?: Category,
      budgetId?: string,
      paymentMode?: PaymentModes,
    ) {
      try {
        fetching = true;

        const target = await getExpense(idToUpdate);

        if (!target) {
          throw Error('Expense:update: expense is missing');
        }

        await db.expense.update(target.id, {
          name: name.trim(),
          amount,
          updatedAt: Date.now(),
          time,
          date,
          category,
          budgetId,
          paymentMode,
        });

        const unordered = await db.expense?.toArray();

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

        const target = await getExpense(idToDelete);

        if (!target) {
          throw Error('Expense:delete: expense is missing');
        }

        await db.expense.delete(target.id);

        const unordered = await db.expense?.toArray();

        data = unordered?.sort((a, b) => b?.createdAt - a?.createdAt);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async deleteAllExpensesFromTrip(tripId: string) {
      try {
        fetching = true;

        const relatedExpense = await db.expense?.where({ tripId }).toArray();
        const relatedExpenseKeys = relatedExpense.map((item) => item.id);

        await db.expense.bulkDelete(relatedExpenseKeys);

        const unordered = await db.expense?.toArray();

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

export const useExpenseStore = createExpenseStore();
