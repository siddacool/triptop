import { db } from '../db';
import type { CreateExpenseFormData } from './create.svelte';

export enum Category {
  FOOD = 'FOOD',
  SHOPPING = 'SHOPPING',
  TOUR = 'TOUR',
  TRANSPORT = 'TRANSPORT',
  STAY = 'STAY',
  FLIGHT = 'FLIGHT',
  ENTERTAINMENT = 'ENTERTAINMENT',
  MART = 'MART',
}

export const enum PaymentModes {
  CASH = 'CASH',
  CARD = 'CARD',
}

export interface Expense {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  description?: string;
  amount: number;
  tripId: string;
  category?: Category;
  date: number;
  paymentMode?: PaymentModes;
  currency: string;
}

function createExpenseStore() {
  let data: Expense | undefined = $state(undefined);
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
    async fetch(expenseId: string) {
      try {
        fetching = true;

        data = await db.expense.where({ _id: expenseId }).first();

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    async update(formData: CreateExpenseFormData) {
      if (!formData?.name?.trim()) {
        return;
      }

      await db.expense.update(data?.id, {
        name: formData.name.trim(),
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
        paymentMode: formData.paymentMode,
        currency: formData.currency,
        updatedAt: Date.now(),
      });
    },
    async delete() {
      await db.expense.delete(data?.id);
    },
    reset() {
      data = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseStore = createExpenseStore();
