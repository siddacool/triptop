<script lang="ts">
  import { downloadFile } from '$lib/helpers/download-file';
  import { getMoment } from '@flightlesslabs/utils';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import Button from '$lib/ui-lib/Button';
  import { useBackupTripStore } from '$lib/stores/trip/backup.svelte';
  import Icon from '@iconify/svelte';

  let loading = $state(false);

  async function exportTrip() {
    try {
      loading = true;

      if (!useTripStore.data?.name) {
        return;
      }

      const backupData = await useBackupTripStore.export(useTripStore.data._id);

      if (!backupData) {
        return;
      }

      const jsonData = JSON.stringify(backupData);

      const data = new Blob([jsonData], { type: 'text/plain' });

      const simplifiedName = simplifyText(useTripStore.data?.name, true).toLocaleLowerCase();

      await downloadFile(
        `${simplifiedName}.${getMoment(backupData.createdAt).format('DD-MM-YYYY_HH-mm-ss')}.backup.json.txt`,
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
  <Button disabled={loading} onclick={exportTrip}>
    <Icon icon="material-symbols:download-rounded" width="24" height="24" />
    Export Trip
  </Button>
</div>

<style lang="scss">
  .ExportJson {
    display: inline-flex;
    margin-left: 12px;
  }
</style>
