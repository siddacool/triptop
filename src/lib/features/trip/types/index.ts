import type { LiveCurrencyExchangeActiveCurrency } from '$lib/features/exchange/types';
import type { CurrencyCode } from '@flightlesslabs/currency';

export interface TripDeviceOnlyData {
  test?: string;
}

export interface Trip {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyCode;
  archived?: boolean;
  locale?: string;
  enableCurrencyConversion?: boolean;
  liveCurrencyExchangeActiveCurrency?: LiveCurrencyExchangeActiveCurrency;
  deviceOnlyData?: TripDeviceOnlyData;
}

export type TripCreateData = Omit<
  Trip,
  'id' | '_id' | 'createdAt' | 'updatedAt' | 'deviceOnlyData' | 'archived'
>;
