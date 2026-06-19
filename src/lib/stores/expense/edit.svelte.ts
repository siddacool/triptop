import { nanoid } from 'nanoid/non-secure';
import { db } from '../db';
import { Category } from '../category/types';
import type { EditExpenseFormData } from './types';

function createEditExpenseStore() {
  return {
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

      await db.expense.update(target.id, {
        ...formData,
        updatedAt: Date.now(),
      });

      return Promise.resolve(expenseId);
    },
    async toggleArchived(expenseId: string) {
      const target = await db.expense.where({ _id: expenseId }).first();

      if (!target?.id) {
        return;
      }

      const isArchived = target.archived ? true : false;

      await db.expense.update(target.id, {
        archived: !isArchived,
        updatedAt: Date.now(),
      });

      return Promise.resolve(expenseId);
    },
  };
}

export const useEditExpenseStore = createEditExpenseStore();
