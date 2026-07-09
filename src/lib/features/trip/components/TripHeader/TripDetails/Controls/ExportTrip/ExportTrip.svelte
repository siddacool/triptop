<script lang="ts">
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripExportStore } from '$lib/stores/trip/export/export.svelte';
  import { type ExportTripTypeOption } from '$lib/stores/trip/export/types';
  import DropdownTool from './DropdownTool/DropdownTool.svelte';

  function handleSelect(value: ExportTripTypeOption) {
    useTripExportStore.exportTrip(value.value);
  }
</script>

{#if useExpenseListStore.expenses.length}
  <DropdownTool onselect={handleSelect} />
{/if}
