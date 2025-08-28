import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Category, PaymentModes } from './individual.svelte';

export interface CreateExpenseFormData {
  name?: string;
  description?: string;
  amount?: number;
  category?: Category;
  date?: number;
  paymentMode?: PaymentModes;
  currency?: string;
}

function createCreateExpenseStore() {
  let formData: CreateExpenseFormData = $state({});
  let loading: boolean = $state(false);

  return {
    get loading() {
      return loading;
    },
    updateForm(data: Partial<CreateExpenseFormData>) {
      formData = {
        ...formData,
        ...data,
      };
    },
    async create(tripId: string) {
      try {
        loading = true;

        if (!formData?.name?.trim() || !formData.amount || !formData.date || !formData.currency) {
          return;
        }

        await db.expense.add({
          _id: nanoid(),
          tripId,
          ...formData,
          name: formData.name.trim(),
          amount: formData.amount,
          date: formData.date,
          currency: formData.currency,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        formData = {};

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
      formData = {};
    },
  };
}

export const useCreateExpenseStore = createCreateExpenseStore();
