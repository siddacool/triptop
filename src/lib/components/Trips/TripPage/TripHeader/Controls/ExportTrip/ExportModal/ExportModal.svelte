<script lang="ts">
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import { Button, Column, FormField, Grid } from '@flightlesslabs/dodo-ui';
  import { Modal, Select } from '@flightlesslabs/dodo-ui-bits';
  import { ExportTripType, exportTripTypeOptions } from './export/types';
  import { downloadFile } from '$lib/helpers/downloadFile';
  import { exportTripAsJson } from './export/export-json';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { exportTripAsCsv } from './export/export-csv';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';

  type Props = {
    open: boolean;
  };

  let { open = $bindable() }: Props = $props();

  let exportType = $state(exportTripTypeOptions[0].value);

  function handleExport() {
    const trip = useTripStore.trip;

    if (!trip) return;

    const exporters = {
      [ExportTripType.JSON]: () => exportTripAsJson(trip, useExpenseListStore.expenses),
      [ExportTripType.CSV]: () =>
        exportTripAsCsv(trip, useExpenseListStore.expenses, useSettingsStore.settings.dateFormat),
    };

    const exportData = exporters[exportType]?.();

    if (!exportData) return;

    downloadFile(exportData.filename, exportData.dataString, exportData.type);

    open = false;
  }
</script>

<Modal bind:open title="Export trip">
  <div class="container">
    <Grid gap={3}>
      <Column>
        <FormField label="Export type:" for="export-type">
          <Select options={exportTripTypeOptions} bind:value={exportType} name="export-type" />
        </FormField>
      </Column>
      <Column>
        <ControlSection>
          <Button onclick={handleExport}>Export trip</Button>
        </ControlSection>
      </Column>
    </Grid>
  </div>
</Modal>

<style lang="scss">
  .container {
    padding: calc(var(--dodo-ui-space) * 1);
  }
</style>
