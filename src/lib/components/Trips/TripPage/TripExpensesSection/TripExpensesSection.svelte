<script lang="ts">
  import ExpenseGroup from '$lib/components/Expenses/ExpenseGroup/ExpenseGroup.svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters.svelte';
  import { getFilteredExpenses } from '$lib/stores/expense/getters/filtered-expenses';
  import { getGroupExpenses } from '$lib/stores/expense/getters/group-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Filters from './Filters/Filters.svelte';
  import TopControls from './TopControls/TopControls.svelte';

  const filtredExpenses = $derived(
    getFilteredExpenses(useExpenseFiltersStore.filters, useExpenseListStore.expenses),
  );
  const groupExpenses = $derived(getGroupExpenses(filtredExpenses));
</script>

{#if useTripStore.trip}
  <div class="TripExpensesSection">
    <TopControls />
    <Filters />
    <ExpenseGroup data={groupExpenses} trip={useTripStore.trip} />
  </div>
{:else}
  ---
{/if}

<style lang="scss">
  .TripExpensesSection {
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
