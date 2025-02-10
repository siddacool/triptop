export const enum SilkAction {
  ADD,
  REMOVE,
}

export interface Silk {
  id?: number;
  _id: string;
  createdAt: number;
  silks: number;
  action: SilkAction;
}
