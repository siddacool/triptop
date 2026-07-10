<script lang="ts">
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { downloadTripAsCSV } from '$lib/features/trip/logic/export/csv.svelte';
  import { exportTrip } from '$lib/features/trip/logic/export/index.svelte';
  import { ExportTripType, type ExportTripTypeOption } from '$lib/features/trip/types/export';
  import DropdownTool from './DropdownTool/DropdownTool.svelte';

  function handleSelect(value: ExportTripTypeOption) {
    if (value.value === ExportTripType.CSV) {
      downloadTripAsCSV();
    } else {
      exportTrip();
    }
  }
</script>

{#if expenseListStore.expenses.length}
  <DropdownTool onselect={handleSelect} />
{/if}
