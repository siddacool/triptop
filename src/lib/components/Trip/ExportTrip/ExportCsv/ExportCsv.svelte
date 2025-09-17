<script lang="ts">
  import { downloadFile } from '$lib/helpers/download-file';
  import { getMoment } from '@flightlesslabs/utils';
  import { makeTripExportCsv } from './csv-adjustments';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { useExpensesStore } from '$lib/stores/expense/list.svelte';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import Button from '$lib/ui-lib/Button';
  import Icon from '@iconify/svelte';

  let loading = $state(false);

  async function exportTrip() {
    try {
      loading = true;

      if (!useExpensesStore.data) {
        return;
      }

      if (!useTripStore.data?.name) {
        return;
      }

      const csvData = makeTripExportCsv(useExpensesStore.data);

      const data = new Blob([csvData], { type: 'text/plain' });

      const simplifiedName = simplifyText(useTripStore.data?.name, true).toLocaleLowerCase();

      await downloadFile(
        `${simplifiedName}.${getMoment().format('DD-MM-YYYY_HH-mm-ss')}.csv`,
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
  <Button disabled={loading} onclick={exportTrip}>
    <Icon icon="material-symbols:save-rounded" width="24" height="24" />Save CSV
  </Button>
</div>

<style lang="scss">
  .ExportCsv {
    display: inline-flex;
  }
</style>
