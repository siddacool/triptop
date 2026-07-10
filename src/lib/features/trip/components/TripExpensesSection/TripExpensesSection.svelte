<script lang="ts">
  import Box from '$lib/components/ui/Box/Box.svelte';
  import ExpenseGroup from '$lib/features/expense/components/ExpenseGroup/ExpenseGroup.svelte';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { tripDetailStore } from '../../store/detail.svelte';
  import Filters from './Filters/Filters.svelte';
  import SpecialFiltersSelector from './Filters/SpecialFilters/SpecialFiltersSelector.svelte';
  import FloatingControls from './FloatingControls/FloatingControls.svelte';
  import Stats from './Stats/Stats.svelte';
</script>

{#if tripDetailStore.trip}
  <div class="TripExpensesSection" id="TripExpensesSection">
    <Filters />
    <Box>
      <SpecialFiltersSelector />
      <Stats />
      <ExpenseGroup data={expenseListStore.expenseDateGroups} trip={tripDetailStore.trip} />
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
