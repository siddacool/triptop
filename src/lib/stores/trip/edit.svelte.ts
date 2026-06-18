import { nanoid } from 'nanoid/non-secure';
import { db } from '../db';
import type { EditTripFormData } from './types';

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

      await db.trips.add({
        _id: newTripId,
        name: name.trim(),
        ...restData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
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

      return Promise.resolve(tripId);
    },
    async toggleArchived(tripId: string) {
      const target = await db.trips.where({ _id: tripId }).first();

      if (!target?.id) {
        return;
      }

      const isArchived = target.archived ? true : false;

      await db.trips.update(target.id, {
        archived: !isArchived,
        updatedAt: Date.now(),
      });

      return Promise.resolve(tripId);
    },
  };
}

export const useEditTripStore = createEditTripStore();
