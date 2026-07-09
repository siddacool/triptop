<script lang="ts">
  import ExpenseGroup from '$lib/components/Expenses/ExpenseGroup/ExpenseGroup.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import { getExpenseGroupList } from '$lib/stores/expense/getters/group-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { tripDetailStore } from '../../store/detail.svelte';
  import Filters from './Filters/Filters.svelte';
  import SpecialFiltersSelector from './Filters/SpecialFilters/SpecialFiltersSelector.svelte';
  import FloatingControls from './FloatingControls/FloatingControls.svelte';
  import Stats from './Stats/Stats.svelte';

  const groupExpenses = $derived(getExpenseGroupList(useExpenseListStore.filtredExpenses));
</script>

{#if tripDetailStore.trip}
  <div class="TripExpensesSection" id="TripExpensesSection">
    <Filters />
    <Box>
      <SpecialFiltersSelector />
      <Stats />
      <ExpenseGroup data={groupExpenses} trip={tripDetailStore.trip} />
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
