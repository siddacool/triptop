import Dexie, { type Table } from 'dexie';
import type { Trip } from '../stores/trips/types';
import type { Budget } from '../stores/budget/types';
import type { Expense } from '../stores/expense/types';

export class MySubClassedDexie extends Dexie {
  trips!: Table<Trip>;
  budget!: Table<Budget>;
  expense!: Table<Expense>;

  constructor() {
    super('triptop');
    this.version(1).stores({
      trips: '++id, _id',
      budget: '++id, _id, tripId',
      expense: '++id, _id, tripId',
    });
  }
}

export const db = new MySubClassedDexie();
