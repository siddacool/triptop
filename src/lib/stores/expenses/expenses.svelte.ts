import { nanoid } from 'nanoid/non-secure';
import { db } from '../db';
import { Category, PaymentModes, type Expense } from './types';
import type { CreateExpenseFormData } from './createExpense.svelte';

function createExpensesStore() {
  let expenses: Expense[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get expenses() {
      return expenses;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async fetch(tripId: string) {
      try {
        fetching = true;

        const expensesData = await db.expense.where({ tripId: tripId }).toArray();
        expensesData.sort((a, b) => b?.date - a?.date);

        expenses = expensesData;

        mounted = true;
        fetching = false;

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        this.reset();

        return Promise.reject(e);
      }
    },
    async syncData(tripId: string) {
      const expensesData = await db.expense.where({ tripId: tripId }).toArray();
      expensesData.sort((a, b) => b?.date - a?.date);

      expenses = expensesData;
    },
    async _createNewExpense(tripId: string, formData: CreateExpenseFormData) {
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

      await this.syncData(tripId);

      return Promise.resolve(newExpenseId);
    },
    async updateExpenseById(expenseId: string, formData: CreateExpenseFormData) {
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

      await this.syncData(target.tripId);
    },
    async deleteExpenseById(expenseId: string) {
      const expensesData = await db.expense.where({ _id: expenseId }).toArray();
      const target = expensesData[0];

      if (!target?.id) {
        return;
      }

      await db.expense.delete(target.id);

      await this.syncData(target.tripId);
    },
    reset() {
      expenses = [];
      mounted = false;
      fetching = false;
    },
  };
}

export const useExpensesStore = createExpensesStore();
