<script lang="ts">
  import { page } from '$app/state';
  import Filter from '$lib/components/Filter.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';
  import BudgetPanel from './BudgetPanel.svelte';
  import CategoryPanel from './CategoryPanel.svelte';
  import ClearFilters from './ClearFilters.svelte';
  import CurrencyPanel from './CurrencyPanel.svelte';
  import PaymentModePanel from './PaymentModePanel.svelte';
  import SearchExpense from './SearchExpense.svelte';

  const tripId = page.params.tripId;
  const isAnyExpenes = $derived(useExpenseStore.data.some((item) => item.tripId === tripId));
</script>

{#if isAnyExpenes}
  <StackItem>
    <SearchExpense />
    <Filter
      open={useTripsFilterStore.open}
      onclick={useTripsFilterStore.toggleFiltersPanelOpen}
      isFilter={useTripsFilterStore.isFilters}
    >
      <div class="enclosure">
        <Card>
          <Stack space={2}>
            <CategoryPanel />
            <PaymentModePanel />
            <BudgetPanel />
            <CurrencyPanel />
            <StackItem />
            <ClearFilters />
          </Stack>
        </Card>
      </div>
    </Filter>
  </StackItem>
{/if}

<style lang="scss">
  .enclosure {
    :global(.Card) {
      padding: 24px 16px;
    }
  }
</style>
