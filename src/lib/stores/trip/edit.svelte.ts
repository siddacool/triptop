import { nanoid } from 'nanoid';
import { db } from '$lib/db';
import type { EditTripFormData } from './types';
import { getExpenses } from '../expense/list.svelte';

function createEditTripStore() {
  return {
    async add(formData: EditTripFormData) {
      if (!formData?.name?.trim()) {
        return;
      }

      if (!formData?.currency?.trim()) {
        return;
      }

      const newTripId = nanoid();

      const { name, ...restData } = formData;

      const now = Date.now();

      await db.trips.add({
        _id: newTripId,
        name: name.trim(),
        ...restData,
        createdAt: now,
        updatedAt: now,
      });

      return Promise.resolve(newTripId);
    },
    async update(tripId: string, formData: EditTripFormData) {
      const target = await db.trips.where({ _id: tripId }).first();

      if (!target?.id) {
        return;
      }

      if (!formData?.name?.trim()) {
        return;
      }

      const { name, ...restData } = formData;

      await db.trips.update(target.id, {
        name: name.trim(),
        ...restData,
        updatedAt: Date.now(),
      });

      return Promise.resolve();
    },
    async delete(tripId: string) {
      const target = await db.trips.where({ _id: tripId }).first();

      if (!target?.id) {
        return;
      }

      await db.trips.delete(target.id);

      const expenses = await getExpenses(tripId);
      const relatedExpenseKeys = expenses.map((item) => item.id);

      if (relatedExpenseKeys.length) {
        await db.expense.bulkDelete(relatedExpenseKeys);
      }

      return Promise.resolve(tripId);
    },
    async toggleArchived(tripId: string, archiveCondition: boolean) {
      const target = await db.trips.where({ _id: tripId }).first();

      if (!target?.id) {
        return;
      }

      await db.trips.update(target.id, {
        archived: archiveCondition,
        updatedAt: Date.now(),
      });

      return Promise.resolve(tripId);
    },
  };
}

export const useEditTripStore = createEditTripStore();
