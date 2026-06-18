export type ExportTripValue<T> = {
  data: T;
  dataString: string;
  filename: string;
  type: string;
};

export const enum ExportTripType {
  JSON = 'JSON',
  CSV = 'CSV',
}

export type ExportTripTypeOption = {
  value: ExportTripType;
  label: string;
};

export const exportTripTypeOptions: ExportTripTypeOption[] = [
  {
    value: ExportTripType.CSV,
    label: 'CSV',
  },
  {
    value: ExportTripType.JSON,
    label: 'JSON',
  },
];
