import type { CategoryOption, Category } from './category';

export interface ExpenseFilterFields {
  name: string;
  date: number;
}

// data that does not need to be stored in db
export interface ExpenseVirtualData {
  filterFields?: ExpenseFilterFields;
  amountHomeCurrency?: number;
}

export interface Expense {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  amount: number;
  tripId: string;
  category?: Category;
  date: string;
  archived?: boolean;
  virtualData?: ExpenseVirtualData;
}

export interface EditExpenseFormData {
  name?: string;
  amount?: number;
  category?: CategoryOption;
  date?: string;
}

export type ExpenseCreateData = Omit<
  Expense,
  'id' | '_id' | 'createdAt' | 'updatedAt' | 'virtualData' | 'archived'
>;

export type ExpenseUpdateData = Omit<Expense, 'id'>;
