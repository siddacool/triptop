import Dexie, { type Table } from 'dexie';
import type { Trip } from './trip/individual.svelte';
import type { Expense } from './expense/individual.svelte';

export class MySubClassedDexie extends Dexie {
  trips!: Table<Trip>;
  expense!: Table<Expense>;

  constructor() {
    super('triptop');
    this.version(4).stores({
      trips: '++id, _id',
      expense: '++id, _id, tripId',
    });
  }
}

export const db = new MySubClassedDexie();
