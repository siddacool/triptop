// db.ts
import { Dexie, type EntityTable } from 'dexie';
import type { Trip } from '../trip/types';
import type { Expense } from '../expense/types';
import type { HistoricalCurrencyExchangeRate } from '../currency/types';

const db = new Dexie('triptop-v5') as Dexie & {
  trips: EntityTable<
    Trip,
    'id' // primary key "id" (for the typings only)
  >;
  expense: EntityTable<
    Expense,
    'id' // primary key "id" (for the typings only)
  >;
  historicalCurrencyExchangeRates: EntityTable<
    HistoricalCurrencyExchangeRate,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(3).stores({
  trips: '++id, _id', // primary key "id" (for the runtime!)
  expense: '++id, _id, tripId, [tripId+date]', // primary key "id" (for the runtime!)
  historicalCurrencyExchangeRates: '++id, homeCurrency, tripCurrency, [homeCurrency+tripCurrency]', // primary key "id" (for the runtime!)
});

export { db };
