import { nanoid } from 'nanoid';
import { db } from '../db';
import { Category } from '../category/types';
import type { EditExpenseFormData } from './types';

function createEditExpenseStore() {
  return {
    async _syncTrip(tripId: string) {
      const targetTrip = await db.trips.where({ _id: tripId }).first();

      if (targetTrip) {
        await db.trips.update(targetTrip.id, {
          updatedAt: Date.now(),
        });
      }
    },
    async add(tripId: string, formData: EditExpenseFormData) {
      if (!formData?.name?.trim() || !formData.amount || !formData.date) {
        return;
      }

      const newExpenseId = nanoid();

      await db.expense.add({
        _id: newExpenseId,
        tripId,
        name: formData.name.trim(),
        amount: formData.amount,
        date: formData.date,
        category: formData.category || Category.OTHER,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      await this._syncTrip(tripId);

      return Promise.resolve(newExpenseId);
    },
    async update(expenseId: string, formData: EditExpenseFormData) {
      const expensesData = await db.expense.where({ _id: expenseId }).toArray();
      const target = expensesData[0];

      if (!target?.id) {
        return;
      }

      if (!formData?.name?.trim()) {
        return;
      }

      const updatedAt = Date.now();

      await db.expense.update(target.id, {
        ...formData,
        updatedAt,
      });

      await this._syncTrip(target.tripId);

      return Promise.resolve(expenseId);
    },
    async delete(expenseId: string) {
      const target = await db.expense.where({ _id: expenseId }).first();

      if (!target?.id) {
        return;
      }

      await db.expense.delete(target.id);

      return Promise.resolve(expenseId);
    },
    async toggleArchived(expenseId: string, archiveCondition: boolean) {
      const target = await db.expense.where({ _id: expenseId }).first();

      if (!target?.id) {
        return;
      }

      const updatedAt = Date.now();

      await db.expense.update(target.id, {
        archived: archiveCondition,
        updatedAt,
      });

      await this._syncTrip(target.tripId);

      return Promise.resolve(expenseId);
    },
  };
}

export const useEditExpenseStore = createEditExpenseStore();
