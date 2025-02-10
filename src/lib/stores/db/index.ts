import Dexie, { type Table } from 'dexie';
import type { Silk } from '../silk/types';

export class MySubClassedDexie extends Dexie {
  silk!: Table<Silk>;

  constructor() {
    super('silkDatabase');
    this.version(1).stores({
      silk: '++id, _id',
    });
  }
}

export const db = new MySubClassedDexie();
