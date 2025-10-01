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
  OTHER = 'OTHER',
}

export const categoryOptions = [
  { value: Category.FOOD, label: 'Food' },
  { value: Category.SHOPPING, label: 'Shopping' },
  { value: Category.TOUR, label: 'Tour' },
  { value: Category.TRANSPORT, label: 'Transport' },
  { value: Category.STAY, label: 'Stay' },
  { value: Category.FLIGHT, label: 'Flight' },
  { value: Category.ENTERTAINMENT, label: 'Entertainment' },
  { value: Category.MART, label: 'Mart' },
  { value: Category.OTHER, label: 'Misc' },
];

export const enum PaymentModes {
  CASH = 'CASH',
  CARD = 'CARD',
}

export const paymentModesOptions = [
  { value: PaymentModes.CASH, label: 'Cash' },
  { value: PaymentModes.CARD, label: 'Card' },
];

export interface Expense {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  amount: number;
  tripId: string;
  category?: Category;
  date: number;
  paymentMode?: PaymentModes;
  currency: string;
  tags?: string;
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
        category: formData.category || Category.OTHER,
        date: formData.date,
        paymentMode: formData.paymentMode,
        currency: formData.currency,
        tags: formData.tags ? JSON.stringify(formData.tags) : undefined,
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
