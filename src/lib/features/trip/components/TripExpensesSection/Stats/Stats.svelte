<script>
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import TotalExpenses from './TotalExpenses/TotalExpenses.svelte';
</script>

{#if expenseListStore.expensesFiltred.length}
  <div class="Stats">
    <TotalExpenses />
  </div>
{/if}

<style lang="scss">
</style>
