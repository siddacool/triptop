import { PaymentModes, type PaymentModeOption } from './types';

export const paymentModeOptions: PaymentModeOption[] = [
  {
    label: '💵 Cash',
    value: PaymentModes.CASH,
  },
  {
    label: '💳 Card',
    value: PaymentModes.CARD,
  },
];
