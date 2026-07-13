import type { ExpenseCreateData, Expense } from '../types';

export function validateExpenseCreate(data: ExpenseCreateData) {
  if (!data.tripId) {
    throw new Error('tripId is required.');
  }

  if (!data.amount) {
    throw new Error('Amount is required.');
  }

  if (!data.date) {
    throw new Error('Date is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}

export function validateExpenseUpdate(data: Expense) {
  if (!data.tripId) {
    throw new Error('tripId is required.');
  }

  if (!data.amount) {
    throw new Error('Amount is required.');
  }

  if (!data.date) {
    throw new Error('Date is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }

  if (data.virtualData) {
    throw new Error('virtualData is not allowed.');
  }
}

export function validateDeleteExpenseByTripId(tripExpensesKeys: number[]) {
  if (!tripExpensesKeys.length) {
    throw new Error('Expenses not found');
  }
}
