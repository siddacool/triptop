<script lang="ts">
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  interface Props {
    expense: Expense;
  }

  const { expense }: Props = $props();
  const currency = $derived(
    useBudgetStore.data.find((item) => item._id === expense.budgetId)?.currency || expense.currency,
  );
</script>

<section class="AmountSection">
  <FormattedCurrency value={expense.amount} {currency} />
</section>

<style lang="scss">
  .AmountSection {
    display: flex;
    align-items: center;
    font-weight: 500;
    flex-wrap: wrap;
  }
</style>
