export enum Category {
  FOOD = 'FOOD',
  SHOPPING = 'SHOPPING',
  TOUR = 'TOUR',
  TRANSPORT = 'TRANSPORT',
  STAY = 'STAY',
  FLIGHT = 'FLIGHT',
  ENTERTAINMENT = 'ENTERTAINMENT',
  MART = 'MART',
  OTHER = 'OTHER',
}

export const categoryOptions = [
  { value: Category.FOOD, label: 'Food' },
  { value: Category.SHOPPING, label: 'Shopping' },
  { value: Category.TOUR, label: 'Tour' },
  { value: Category.TRANSPORT, label: 'Transport' },
  { value: Category.STAY, label: 'Stay' },
  { value: Category.FLIGHT, label: 'Flight' },
  { value: Category.ENTERTAINMENT, label: 'Entertainment' },
  { value: Category.MART, label: 'Mart' },
  { value: Category.OTHER, label: 'Misc' },
];

export const enum PaymentModes {
  CASH = 'CASH',
  CARD = 'CARD',
}

export const paymentModesOptions = [
  { value: PaymentModes.CASH, label: 'Cash' },
  { value: PaymentModes.CARD, label: 'Card' },
];

export interface Expense {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  amount: number;
  tripId: string;
  category?: Category;
  date: number;
  paymentMode?: PaymentModes;
}
