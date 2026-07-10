<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import { resolve } from '$app/paths';
  import type { ExportTripData } from '$lib/features/trip/types/export';
  import { importTrip } from '$lib/features/trip/logic/import.svelte';

  async function handleImport(file: File) {
    try {
      const data = JSON.parse(await file.text()) as ExportTripData;

      await importTrip(data);

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

      await handleImport(file);
    });
  });
</script>
