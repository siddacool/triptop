export interface Trip {
  id?: number;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export type TripFormData = {
  name: string;
  startDate: Date;
  endDate: Date;
};
