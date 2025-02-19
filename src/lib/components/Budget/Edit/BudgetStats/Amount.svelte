<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { StatsItem } from '$lib/components/StatsCard';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';

  const id = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === id));
</script>

<StatsItem>
  {#snippet label()}
    Amount
  {/snippet}
  {#snippet value()}
    <FormattedCurrency value={targetBudget?.amount || 0} />
  {/snippet}
</StatsItem>
