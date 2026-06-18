<script lang="ts">
  import ExpenseGroup from '$lib/components/Expenses/ExpenseGroup/ExpenseGroup.svelte';
  import { getGroupExpenses } from '$lib/stores/expense/getters/group-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Filters from './Filters/Filters.svelte';
  import Stats from './Stats/Stats.svelte';
  import TopControls from './TopControls/TopControls.svelte';

  const groupExpenses = $derived(getGroupExpenses(useExpenseListStore.filtredExpenses));
</script>

{#if useTripStore.trip}
  <div class="TripExpensesSection">
    <TopControls />
    <Filters />
    <Stats />
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
