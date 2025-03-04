<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { readFileAsync } from '$lib/helpers/upload-file';
  import validateJson from '$lib/helpers/validators/vaidate-json';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { ExportTripData } from '$lib/stores/trips/types';

  let uploading = $state(false);
  let fileUploadElement: HTMLInputElement | undefined = $state(undefined);
  let files: FileList | undefined = $state(undefined);

  async function onchange() {
    try {
      uploading = true;
      const file = await readFileAsync(files);

      if (!file) {
        throw 'No file found';
      }

      if (!validateJson(file)) {
        throw 'Invalid data';
      }

      const importedData = JSON.parse(file) as ExportTripData;

      await useTripsStore.import(importedData);

      files = undefined;
    } catch (e) {
      console.error(e);
    } finally {
      uploading = false;
    }
  }

  function onclick() {
    fileUploadElement?.click();
  }
</script>

<StackItem>
  <div class="ImportTrip">
    <input
      accept=".txt"
      bind:files
      bind:this={fileUploadElement}
      id="upload"
      name="upload"
      type="file"
      {onchange}
      disabled={uploading}
      class="file-upload"
    />

    <Button {onclick} disabled={uploading}>Import Trip</Button>
  </div>
</StackItem>

<style lang="scss">
  .ImportTrip {
    text-align: center;
    margin-top: 16px;

    .file-upload {
      opacity: 0;
      position: absolute;
      z-index: -100;
    }
  }
</style>
