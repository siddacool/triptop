import type { CurrencyExchangeRate } from '$lib/features/exchange/types';
import type { Expense } from '$lib/features/expense/types';
import type { Trip } from '$lib/features/trip/types';
import { Dexie, type EntityTable } from 'dexie';

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
    CurrencyExchangeRate,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(6).stores({
  trips: '++id, _id', // primary key "id" (for the runtime!)
  expense: '++id, _id, tripId, [tripId+date]', // primary key "id" (for the runtime!)
  historicalCurrencyExchangeRates: '++id, homeCurrency, tripCurrency, [homeCurrency+tripCurrency]', // primary key "id" (for the runtime!)
});

export { db };
