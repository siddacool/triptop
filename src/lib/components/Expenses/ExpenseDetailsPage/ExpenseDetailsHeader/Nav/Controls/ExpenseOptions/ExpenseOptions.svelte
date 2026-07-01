<script>
  import DropdownTool from './DropdownTool.svelte';
  import ArchiveToggleExpense from './Options/ArchiveToggleExpense.svelte';
  import DeleteExpense from './Options/DeleteExpense.svelte';
  import EditExpense from './Options/EditExpense.svelte';
</script>

<DropdownTool>
  <EditExpense />
  <ArchiveToggleExpense />
  <DeleteExpense />
</DropdownTool>
