import { Category, PaymentModes } from './types';
import { useExpensesStore } from './expenses.svelte';

export interface CreateExpenseFormData {
  name?: string;
  amount?: number;
  category?: Category;
  date?: number;
  paymentMode?: PaymentModes;
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
    async create(tripId: string) {
      try {
        loading = true;

        const res = await useExpensesStore._createNewExpense(tripId, formData);

        formData = {};

        return Promise.resolve(res);
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
