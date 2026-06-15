import type { CurrencyCode } from '@flightlesslabs/currency';

export interface Trip {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyCode;
}
