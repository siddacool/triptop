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

export const categoryOptions: CategoryOption[] = [
  {
    value: Category.FOOD,
    label: 'Food',
    meta: {
      icon: {
        name: 'proicons:food',
      },
    },
  },
  {
    value: Category.SHOPPING,
    label: 'Shopping',
    meta: {
      icon: {
        name: 'proicons:diamond',
      },
    },
  },
  {
    value: Category.TOUR,
    label: 'Tour',
    meta: {
      icon: {
        name: 'carbon:sailboat-coastal',
      },
    },
  },
  {
    value: Category.TRANSPORT,
    label: 'Transport',
    meta: {
      icon: {
        name: 'proicons:vehicle-car',
      },
    },
  },
  {
    value: Category.STAY,
    label: 'Stay',
    meta: {
      icon: {
        name: 'carbon:stay-inside',
      },
    },
  },
  {
    value: Category.FLIGHT,
    label: 'Flight',
    meta: {
      icon: {
        name: 'cil:flight-takeoff',
      },
    },
  },
  {
    value: Category.ENTERTAINMENT,
    label: 'Entertainment',
    meta: {
      icon: {
        name: 'streamline-plump:theater-mask',
      },
    },
  },
  {
    value: Category.MART,
    label: 'Mart',
    meta: {
      icon: {
        name: 'carbon:shopping-bag',
      },
    },
  },
  {
    value: Category.OTHER,
    label: 'Misc',
    meta: {
      icon: {
        name: 'carbon:assembly-cluster',
      },
    },
  },
];

export const enum PaymentModes {
  CASH = 'CASH',
  CARD = 'CARD',
}

export type PaymentModesOption = {
  value: PaymentModes;
  label: string;
  meta?: {
    icon?: {
      name: string;
    };
  };
};

export const paymentModesOptions: PaymentModesOption[] = [
  {
    value: PaymentModes.CASH,
    label: 'Cash',
    meta: {
      icon: {
        name: 'boxicons:coin',
      },
    },
  },
  {
    value: PaymentModes.CARD,
    label: 'Card',
    meta: {
      icon: {
        name: 'famicons:card-outline',
      },
    },
  },
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
  date: string;
  paymentMode?: PaymentModes;
  archived?: boolean;
  searchFields?: {
    name: string;
  };
}

export interface EditExpenseFormData {
  name?: string;
  amount?: number;
  category?: Category;
  date?: string;
  paymentMode?: PaymentModes;
}
