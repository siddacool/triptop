<script lang="ts">
  import { page } from '$app/state';
  import { StatsItem } from '$lib/components/StatsCard';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';

  const id = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === id));

  const paymentModeValue = $derived(
    paymentModeOptions.find((item) => item.value === targetBudget?.paymentMode)?.label ||
      paymentModeOptions[0]?.label,
  );
</script>

<StatsItem>
  {#snippet label()}
    Payment mode
  {/snippet}
  {#snippet value()}
    {paymentModeValue}
  {/snippet}
</StatsItem>
