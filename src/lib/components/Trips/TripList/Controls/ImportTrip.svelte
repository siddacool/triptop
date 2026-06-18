<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { ExportTripJsonValue } from '../../TripPage/TripHeader/Controls/ExportTrip/ExportModal/export/export-json';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import { useTripImportStore } from '$lib/stores/trip/import.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';

  let fileInput = $state<HTMLInputElement>();

  async function handleImport(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      const data = JSON.parse(await file.text()) as ExportTripJsonValue | undefined;

      if (!data?.trip?.name) {
        throw new Error('Invalid trip format');
      }

      await useTripImportStore.importTrip(data);

      await useTripListStore.fetch();

      toasts.add({
        title: 'Success',
        description: 'Trip imported successfully',
        color: 'primary',
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Error',
        description: message,
        color: 'danger',
      });
    } finally {
      input.value = '';
    }
  }
</script>

<Button
  variant="text"
  outline
  roundness={2}
  onclick={() => fileInput?.showPicker()}
  disabled={useTripImportStore.fetching}
>
  Import trip
</Button>

<input
  bind:this={fileInput}
  type="file"
  accept="application/json,.json"
  hidden
  onchange={handleImport}
/>
