import { ExportTripType, type ExportTripTypeOption } from '../types/export';

export const exportTripTypeOptions: ExportTripTypeOption[] = [
  {
    value: ExportTripType.CSV,
    label: 'Download as CSV',
  },
  {
    value: ExportTripType.JSON,
    label: 'Export trip',
  },
];
