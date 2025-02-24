import type { PaymentModes } from '../payment-mode/types';

export interface Budget {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  amount: number;
  tripId: string;
  paymentMode: PaymentModes;
}
