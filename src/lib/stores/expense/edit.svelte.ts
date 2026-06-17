import { nanoid } from 'nanoid/non-secure';
import { db } from '../db';
import { Category, PaymentModes, type EditExpenseFormData } from './types';

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
        paymentMode: formData.paymentMode || PaymentModes.CASH,
        category: formData.category || Category.OTHER,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      return Promise.resolve(newExpenseId);
    },
    async updated(expenseId: string, formData: EditExpenseFormData) {
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
    async delete(expenseId: string) {
      const expensesData = await db.expense.where({ _id: expenseId }).toArray();
      const target = expensesData[0];

      if (!target?.id) {
        return;
      }

      await db.expense.delete(target.id);

      return Promise.resolve(expenseId);
    },
  };
}

export const useEditExpenseStore = createEditExpenseStore();
