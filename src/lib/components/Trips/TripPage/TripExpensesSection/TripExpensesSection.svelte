<script lang="ts">
  import ExpenseGroup from '$lib/components/Expenses/ExpenseGroup/ExpenseGroup.svelte';
  import { getGroupExpenses } from '$lib/stores/expense/getters/group-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import TopControls from './TopControls/TopControls.svelte';

  const groupExpenses = $derived(getGroupExpenses(useExpenseListStore.expenses));
</script>

<div class="TripExpensesSection">
  <TopControls />
  <ExpenseGroup data={groupExpenses} />
</div>

<style lang="scss">
  .TripExpensesSection {
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
