<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import ExportModal from './ExportModal/ExportModal.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';

  let openModal = $state(false);
</script>

{#if useExpenseListStore.expenses.length}
  <Button
    aria-label="Export trip"
    class="TripPageExportTrip"
    variant="text"
    roundness="full"
    title="Export trip"
    onclick={() => (openModal = true)}
    compact
  >
    <Icon icon="material-symbols:download" />
  </Button>
{/if}

<ExportModal bind:open={openModal} />

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TripPageExportTrip) {
    font-size: 1.5rem;
  }
</style>
