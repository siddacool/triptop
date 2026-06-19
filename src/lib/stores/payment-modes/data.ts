import { PaymentModes, type PaymentModesOption } from './types';

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
