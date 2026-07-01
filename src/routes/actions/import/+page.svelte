<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import { toasts } from '@flightlesslabs/dodo-ui-bits';

  import { useTripImportStore } from '$lib/stores/trip/import.svelte';
  import { useTripListStore } from '$lib/stores/trip/list.svelte';
  import { resolve } from '$app/paths';
  import type { ExportTripJsonValue } from '$lib/stores/trip/export/export-json';

  async function importTrip(file: File) {
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

      // Navigate wherever makes sense after importing
      await goto(resolve('/trips'));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Error',
        description: message,
        color: 'danger',
      });
    }
  }

  onMount(() => {
    if (!('launchQueue' in window)) {
      return;
    }

    launchQueue.setConsumer(async ({ files }) => {
      if (!files.length) {
        return;
      }

      const file = await files[0].getFile();

      await importTrip(file);
    });
  });
</script>
