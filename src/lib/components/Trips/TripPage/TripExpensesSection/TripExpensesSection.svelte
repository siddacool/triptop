<script lang="ts">
  import ExpenseGroup from '$lib/components/Expenses/ExpenseGroup/ExpenseGroup.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import { getGroupExpenses } from '$lib/stores/expense/getters/group-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  // import Callouts from './Callouts/Callouts.svelte';
  import Filters from './Filters/Filters.svelte';
  import SpecialFiltersSelector from './Filters/SpecialFilters/SpecialFiltersSelector.svelte';
  import FloatingControls from './FloatingControls/FloatingControls.svelte';
  import Stats from './Stats/Stats.svelte';

  const groupExpenses = $derived(getGroupExpenses(useExpenseListStore.filtredExpenses));
</script>

{#if useTripStore.trip}
  <div class="TripExpensesSection" id="TripExpensesSection">
    <Filters />
    <!-- <Callouts /> -->
    <Box>
      <SpecialFiltersSelector />
      <Stats />
      <ExpenseGroup data={groupExpenses} trip={useTripStore.trip} />
      <FloatingControls />
    </Box>
  </div>
{/if}

<style lang="scss">
  .TripExpensesSection {
    margin-top: calc(var(--dodo-ui-space) * 1);

    @media (min-width: 600px) {
      margin-top: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
