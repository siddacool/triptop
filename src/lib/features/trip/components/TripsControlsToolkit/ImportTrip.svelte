<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { importTrip } from '../../logic/import.svelte';
  import type { ExportTripData } from '../../types/export';

  let fileInput = $state<HTMLInputElement>();
  let loading = $state(false);

  async function handleImport(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      loading = true;
      const data = JSON.parse(await file.text()) as ExportTripData;

      await importTrip(data);

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
      loading = false;
    }
  }
</script>

<Button
  variant="text"
  outline
  roundness={2}
  onclick={() => fileInput?.showPicker()}
  disabled={loading}
>
  <span class="Icon">
    <Icon icon="material-symbols:upload" />
  </span>

  Import trip
</Button>

<input bind:this={fileInput} type="file" accept=".json,.triptop" hidden onchange={handleImport} />

<style lang="scss">
  .Icon {
    font-size: 1.4rem;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }
</style>
