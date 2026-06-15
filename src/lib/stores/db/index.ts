// db.ts
import { Dexie, type EntityTable } from 'dexie';
import type { Trip } from '../trip/types';
import type { Expense } from '../expenses/types';

const db = new Dexie('triptop-v5') as Dexie & {
  trips: EntityTable<
    Trip,
    'id' // primary key "id" (for the typings only)
  >;
  expense: EntityTable<
    Expense,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  trips: '++id, _id', // primary key "id" (for the runtime!)
  expense: '++id, _id', // primary key "id" (for the runtime!)
});

export { db };
