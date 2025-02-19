<script lang="ts">
  import { page } from '$app/state';
  import { StatsItem } from '$lib/components/StatsCard';
  import { categoryOptions, useExpenseStore } from '$lib/stores/expense/expense.svelte';

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
</script>

<StatsItem>
  {#snippet label()}
    Category
  {/snippet}
  {#snippet value()}
    {categoryOptions.find((item) => item.value === targetExpense?.category)?.logo || ''}
    {categoryOptions.find((item) => item.value === targetExpense?.category)?.label || 'Other'}
  {/snippet}
</StatsItem>
