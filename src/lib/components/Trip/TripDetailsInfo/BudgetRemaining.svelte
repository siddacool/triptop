<script lang="ts">
  import { page } from '$app/state';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import FormattedCurrency from '../../FormattedCurrency.svelte';
  import StatsTemplate from './StatsTemplate.svelte';

  const id = page.params.id;
  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === id));
  const totalBudget = $derived(
    budgets.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );

  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === id));

  const expensesFiltered = $derived(expenses.filter((item) => item.tripId === id && item.budgetId));

  const totalExpensesFiltred = $derived(
    expensesFiltered.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<StatsTemplate>
  {#snippet label()}
    Budget: Remaining
  {/snippet}
  {#snippet value()}
    <a href={`/${id}/budget`}>
      {#if budgets.length}
        <FormattedCurrency value={totalBudget - totalExpensesFiltred} />
      {/if}
    </a>
  {/snippet}
</StatsTemplate>

<style lang="scss">
  a {
    :global(.FormattedCurrency) {
      color: var(--color-danger-800);
    }
  }
</style>
