export type ExportTripValue<T> = {
  data: T;
  dataString: string;
  filename: string;
  type: string;
};

export const enum ExportTripType {
  JSON = 'JSON',
}

export type ExportTripTypeOption = {
  value: ExportTripType;
  label: string;
};

export const exportTripTypeOptions: ExportTripTypeOption[] = [
  {
    value: ExportTripType.JSON,
    label: 'JSON',
  },
];
