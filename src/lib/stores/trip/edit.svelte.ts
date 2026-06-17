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

      await db.trips.add({
        _id: newTripId,
        name: formData.name.trim(),
        currency: formData.currency,
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

      await db.trips.update(target.id, {
        name: formData.name.trim(),
        currency: formData.currency,
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
