import { useTripStore } from '../individual.svelte';
import { ExportTripType, type ExportTripValue } from './types';
import { exportTripAsCsv } from './export-csv';
import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
import { exportTripAsJson, type ExportTripJsonValue } from './export-json';
import { downloadFile } from '$lib/helpers/downloadFile';

function createTripExportStore() {
  let fetching: boolean = $state(false);

  return {
    get fetching() {
      return fetching;
    },
    async exportTrip(type: ExportTripType) {
      try {
        fetching = true;

        const trip = useTripStore.trip;

        if (!trip) {
          return;
        }

        const expenses = useExpenseListStore.expenses;
        const settings = useSettingsStore.settings;
        const dateFormat = settings.dateFormat;
        const enableCurrencyConversion = settings.enableCurrencyConversion;
        const homeCurrency = settings.homeCurrency;

        let exportData: undefined | ExportTripValue<string> | ExportTripValue<ExportTripJsonValue> =
          undefined;

        if (type === ExportTripType.CSV) {
          exportData = exportTripAsCsv(
            trip,
            expenses,
            dateFormat,
            enableCurrencyConversion,
            homeCurrency,
          );
        } else {
          exportData = exportTripAsJson(trip, expenses);
        }

        if (!exportData) {
          return;
        }

        downloadFile(exportData.filename, exportData.dataString, exportData.type);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const useTripExportStore = createTripExportStore();
