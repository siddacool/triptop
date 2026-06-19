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
