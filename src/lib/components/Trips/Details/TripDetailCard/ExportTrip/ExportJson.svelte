<script lang="ts">
  import { page } from '$app/state';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import { getMoment } from '$lib/helpers/time';
  import { getExportTripData } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;
  let loading = $state(false);

  async function exportTrip() {
    try {
      loading = true;

      const exportTripData = await getExportTripData(tripId);

      const data = new Blob([JSON.stringify(exportTripData)], { type: 'text/plain' });

      const simplifiedName = simplifyText(exportTripData.trip.name, true).toLowerCase();

      await downloadFile(
        `${simplifiedName}.${getMoment(exportTripData.exportedAt).format('DD-MM-YYYY_HH-mm-ss')}.json.txt`,
        data,
      );
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  }
</script>

<div class="ExportJson">
  <Button disabled={loading} onclick={exportTrip}>Export JSON</Button>
</div>

<style lang="scss">
  .ExportJson {
    display: inline-flex;
    margin-right: 16px;
  }
</style>
