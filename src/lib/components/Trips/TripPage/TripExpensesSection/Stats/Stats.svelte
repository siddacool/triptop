<script>
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import TotalExpenses from './TotalExpenses/TotalExpenses.svelte';
</script>

{#if useExpenseListStore.filtredExpenses.length}
  <div class="Stats">
    <TotalExpenses />
  </div>
{/if}

<style lang="scss">
</style>
