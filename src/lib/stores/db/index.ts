import Dexie, { type Table } from 'dexie';
import type { Trip } from '../trips/types';
import type { Budget } from '../budget/types';
import type { Expense } from '../expense/types';

export class MySubClassedDexie extends Dexie {
  trips!: Table<Trip>;
  budget!: Table<Budget>;
  expense!: Table<Expense>;

  constructor() {
    super('triptop');
    this.version(1).stores({
      trips: '++id, _id',
      budget: '++id, _id',
      expense: '++id, _id',
    });
  }
}

export const db = new MySubClassedDexie();
