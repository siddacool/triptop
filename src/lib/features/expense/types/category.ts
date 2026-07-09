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

export type CategoryOption = {
  value: Category;
  label: string;
  meta?: {
    icon?: {
      name: string;
    };
  };
};
