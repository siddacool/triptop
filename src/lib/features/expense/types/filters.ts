import type { Category } from './category';

export type ExpenseFiltersBase = {
  search?: string;
};

export type ExpenseFiltersSpecial = {
  category?: Category;
  minDate?: string;
  maxDate?: string;
};

export type ExpenseFilters = ExpenseFiltersBase & ExpenseFiltersSpecial;
