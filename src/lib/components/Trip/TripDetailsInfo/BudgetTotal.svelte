<script lang="ts">
  import { page } from '$app/state';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import FormattedCurrency from '../../FormattedCurrency.svelte';
  import StatsTemplate from './StatsTemplate.svelte';

  const id = page.params.id;
  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === id));
  const totalBudget = $derived(
    budgets.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<StatsTemplate>
  {#snippet label()}
    Budget: Total
  {/snippet}
  {#snippet value()}
    <a href={`/${id}/budget`}>
      {#if budgets.length}
        <FormattedCurrency value={totalBudget} />
      {:else}
        Add budget
      {/if}
    </a>
  {/snippet}
</StatsTemplate>
