import { nanoid } from 'nanoid';
import { db } from '../db';

export interface CreateTripFormData {
  name?: string;
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

        if (!formData?.name?.trim()) {
          return;
        }

        const newTripId = nanoid();

        await db.trips.add({
          _id: newTripId,
          name: formData.name.trim(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        formData = {};

        return Promise.resolve(newTripId);
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
