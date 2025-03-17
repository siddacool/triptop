<script lang="ts">
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { getCurrencyWiseExpense } from '$lib/stores/expense/expense.svelte';
  import type { CurrencyWiseExpense } from '$lib/stores/expense/types';
  import { getFiltredExpenses, useTripsFilterStore } from '$lib/stores/trips/trips-filter.svelte';

  let expenseCurrencyWise: CurrencyWiseExpense[] = $state([]);

  async function makeExpenses() {
    const expense = await getFiltredExpenses();

    expenseCurrencyWise = getCurrencyWiseExpense(expense);
  }

  $effect(() => {
    if (useTripsFilterStore.updatedAt) {
      makeExpenses();
    }
  });
</script>

{#if (useTripsFilterStore.isFilters || useTripsFilterStore.filters.searchTerm?.trim()) && expenseCurrencyWise.length}
  <div class="FilteredTotalExpense">
    <h4>Total Expense (Filter)</h4>

    <ul class="total">
      {#each expenseCurrencyWise as item (item.currency)}
        <li>{item.currency} <FormattedCurrency value={item.total} currency={item.currency} /></li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .FilteredTotalExpense {
    margin-top: 16px;
  }

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-grey-font-700);
    letter-spacing: 0.3px;
    margin: 0;
    margin-top: 8px;
  }

  .total {
    margin: 0;
    margin-bottom: 8px;
    margin-top: 6px;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
      display: block;
      font-size: 0.8rem;
      margin-bottom: 4px;
      font-weight: 500;
      color: var(--color-grey-font-600);
    }
  }
</style>
