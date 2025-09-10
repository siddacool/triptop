import { db } from '../db';

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
    reset() {
      data = undefined;
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpenseStore = createExpenseStore();
