export const enum PaymentModes {
  CASH = 'CASH',
  CARD = 'CARD',
}

export type PaymentModeOption = {
  label: string;
  value: PaymentModes;
};
