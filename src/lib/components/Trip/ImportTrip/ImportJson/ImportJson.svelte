<script lang="ts">
  import Button from '$lib/ui-lib/Button';
  import { useBackupTripStore, type BackupTripData } from '$lib/stores/trip/backup.svelte';
  import Icon from '@iconify/svelte';
  import validateJson from '$lib/helpers/validators/vaidate-json';
  import { readFileAsync } from '$lib/helpers/upload-file';
  import { processFirstError } from '$lib/helpers/process-errors';
  import Message from '$lib/ui-lib/Message/Message.svelte';
  import FormControl from '$lib/ui-lib/FormControl/FormControl.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let loading = $state(false);
  let fileUploadElement: HTMLInputElement | undefined = $state(undefined);
  let files: FileList | undefined = $state(undefined);

  let errorMessage = $state('');

  async function importTrip() {
    try {
      loading = true;

      errorMessage = '';

      const file = await readFileAsync(files);

      if (!file) {
        throw 'No file found';
      }

      if (!validateJson(file)) {
        throw 'Invalid data';
      }

      const importedData = JSON.parse(file) as BackupTripData;

      const newTripId = await useBackupTripStore.import(importedData);

      files = undefined;

      const resolved = resolve(`/${newTripId}`);

      goto(resolved);
    } catch (e) {
      console.log(e);

      errorMessage = processFirstError(e);
    } finally {
      loading = false;
    }
  }

  function onclick() {
    fileUploadElement?.click();
  }
</script>

<div class="ImportJson">
  <input
    accept=".txt"
    bind:files
    bind:this={fileUploadElement}
    id="upload"
    name="upload"
    type="file"
    onchange={importTrip}
    disabled={loading}
    class="file-upload"
  />
  <FormControl {errorMessage}>
    <Button disabled={loading} {onclick}>
      <Icon icon="material-symbols:upload-rounded" width="24" height="24" />
      Import Trip
    </Button>
  </FormControl>
</div>

<style lang="scss">
  .ImportJson {
    display: flex;
    align-items: center;
    flex-direction: column;

    .file-upload {
      opacity: 0;
      position: absolute;
      z-index: -100;
    }

    :global(.FormControl) {
      text-align: center;
    }
  }
</style>
