<script lang="ts">
  import { page } from '$app/state';
  import { StatsItem } from '$lib/components/StatsCard';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
  const targetBudget = $derived(
    useBudgetStore.data.find((item) => item._id === targetExpense?.budgetId),
  );

  const paymentModeRaw = $derived(
    targetBudget ? targetBudget.paymentMode : targetExpense?.paymentMode,
  );

  const paymentModeValue = $derived(
    paymentModeOptions.find((item) => item.value === paymentModeRaw)?.label ||
      paymentModeOptions[0]?.label,
  );
</script>

<StatsItem>
  {#snippet label()}
    Payment mode
  {/snippet}
  {#snippet value()}
    {paymentModeValue}

    {#if targetBudget}
      ({targetBudget.name})
    {/if}
  {/snippet}
</StatsItem>
