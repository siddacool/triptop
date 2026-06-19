import { Category, type CategoryOption } from './types';

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
