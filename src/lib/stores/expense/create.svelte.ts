import { nanoid } from 'nanoid';
import { db } from '../db';
import { PaymentModes, type Category } from './individual.svelte';
import { getMoment } from '@flightlesslabs/utils';
import { getLatestExpense } from './list.svelte';

export interface CreateExpenseFormData {
  name?: string;
  amount?: number;
  category?: Category;
  date?: number;
  paymentMode?: PaymentModes;
  currency?: string;
}

function getDefaultFormData(): CreateExpenseFormData {
  return {
    name: undefined,
    amount: undefined,
    category: undefined,
    date: getMoment().valueOf(),
    paymentMode: PaymentModes.CASH,
    currency: undefined,
  };
}

function createCreateExpenseStore() {
  let formData: CreateExpenseFormData = $state({});
  let loading: boolean = $state(false);

  return {
    get loading() {
      return loading;
    },
    get formData() {
      return formData;
    },
    updateForm(data: Partial<CreateExpenseFormData>) {
      formData = {
        ...formData,
        ...data,
      };
    },
    async substituteFormData(tripId: string) {
      try {
        const latestExpense = await getLatestExpense(tripId);

        if (latestExpense) {
          formData = {
            name: undefined,
            amount: latestExpense.amount,
            category: latestExpense.category,
            date: latestExpense.date,
            paymentMode: latestExpense.paymentMode || PaymentModes.CASH,
            currency: latestExpense.currency,
          };
        } else {
          formData = getDefaultFormData();
        }
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      }
    },
    async create(tripId: string) {
      try {
        loading = true;

        if (!formData?.name?.trim() || !formData.amount || !formData.date || !formData.currency) {
          throw 'formData incomplete';
        }

        await db.expense.add({
          _id: nanoid(),
          tripId,
          name: formData.name.trim(),
          amount: formData.amount,
          date: formData.date,
          currency: formData.currency,
          paymentMode: formData.paymentMode,
          category: formData.category,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        await this.substituteFormData(tripId);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        loading = false;
      }
    },
    reset() {
      loading = false;
      formData = getDefaultFormData();
    },
  };
}

export const useCreateExpenseStore = createCreateExpenseStore();
