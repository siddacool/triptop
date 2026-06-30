<script lang="ts">
  import Icon from '@iconify/svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { Dropdown, type DropdownMenuOption } from '@flightlesslabs/dodo-ui-bits';
  import {
    ExportTripType,
    exportTripTypeOptions,
    type ExportTripTypeOption,
  } from './ExportModal/export/types';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { exportTripAsJson } from './ExportModal/export/export-json';
  import { exportTripAsCsv } from './ExportModal/export/export-csv';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { downloadFile } from '$lib/helpers/downloadFile';

  function handleSelect(valueRaw: DropdownMenuOption) {
    const value = valueRaw as ExportTripTypeOption;

    const trip = useTripStore.trip;

    if (!trip) return;

    const exporters = {
      [ExportTripType.JSON]: () => exportTripAsJson(trip, useExpenseListStore.expenses),
      [ExportTripType.CSV]: () =>
        exportTripAsCsv(
          trip,
          useExpenseListStore.expenses,
          useSettingsStore.settings.dateFormat,
          useSettingsStore.settings.enableCurrencyConversion,
          useSettingsStore.settings.homeCurrency,
        ),
    };

    const exportData = exporters[value.value]?.();

    if (!exportData) return;

    downloadFile(exportData.filename, exportData.dataString, exportData.type);
  }
</script>

{#if useExpenseListStore.expenses.length}
  <Dropdown
    aria-label="Export trip"
    class="TripPageExportTrip"
    triggerProps={{
      title: 'Export trip',
      variant: 'text',
      roundness: 'full',
      compact: true,
      class: 'TripPageExportTripButton',
    }}
    menuProps={{
      align: 'end',
      color: 'primary',
    }}
    options={exportTripTypeOptions}
    onselect={handleSelect}
  >
    <Icon icon="material-symbols:download" />
  </Dropdown>
{/if}

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageExportTripButton) {
    font-size: 1.5rem;
  }
</style>
