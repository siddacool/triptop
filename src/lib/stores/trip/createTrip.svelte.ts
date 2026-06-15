import { type CurrencyCode } from '@flightlesslabs/currency';
import { useTripsStore } from './trips.svelte';

export interface CreateTripFormData {
  name?: string;
  currency?: CurrencyCode;
}

function createCreateTripStore() {
  let formData: CreateTripFormData = $state({});
  let loading: boolean = $state(false);

  return {
    get loading() {
      return loading;
    },
    get formData() {
      return formData;
    },
    updateForm(data: Partial<CreateTripFormData>) {
      formData = {
        ...formData,
        ...data,
      };
    },
    async create() {
      try {
        loading = true;

        const res = await useTripsStore._createNewTrip(formData);

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

export const useCreateTripStore = createCreateTripStore();
