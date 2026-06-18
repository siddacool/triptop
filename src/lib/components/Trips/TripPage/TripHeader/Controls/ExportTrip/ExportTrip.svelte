<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import ExportModal from './ExportModal/ExportModal.svelte';

  let openModal = $state(false);
</script>

<Button
  aria-label="Export trip"
  class="TripPageExportTrip"
  variant="text"
  roundness="pill"
  title="Export trip"
  outline
  onclick={() => (openModal = true)}
>
  <Icon icon="material-symbols:download" />
</Button>

<ExportModal bind:open={openModal} />

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageExportTrip) {
    font-size: 1.5rem;
  }
</style>
