<script lang="ts">
  import { page } from '$app/state';
  import FormattedCurrency from '$lib/components/FormattedCurrency.svelte';
  import { StatsItem } from '$lib/components/StatsCard';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
</script>

<StatsItem>
  {#snippet label()}
    Amount
  {/snippet}
  {#snippet value()}
    <FormattedCurrency value={targetExpense?.amount || 0} />
  {/snippet}
</StatsItem>
