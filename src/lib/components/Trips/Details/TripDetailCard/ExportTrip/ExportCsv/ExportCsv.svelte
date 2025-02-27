<script lang="ts">
  import { page } from '$app/state';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import { getMoment } from '$lib/helpers/time';
  import { getExportTripData } from '$lib/stores/trips/trips.svelte';
  import { makeTripExportCsv } from './csv-adjustments';

  const tripId = page.params.tripId;
  let loading = $state(false);

  async function exportTrip() {
    try {
      loading = true;

      const exportTripData = await getExportTripData(tripId);

      const csvData = makeTripExportCsv(exportTripData);

      const data = new Blob([csvData], { type: 'text/plain' });

      const simplifiedName = simplifyText(exportTripData.trip.name, true).toLowerCase();

      await downloadFile(
        `${simplifiedName}.${getMoment(exportTripData.exportedAt).format('DD-MM-YYYY_HH-mm-ss')}.csv`,
        data,
      );
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  }
</script>

<div class="ExportCsv">
  <Button disabled={loading} onclick={exportTrip}>Export CSV</Button>
</div>

<style lang="scss">
  .ExportCsv {
    display: inline-flex;
  }
</style>
