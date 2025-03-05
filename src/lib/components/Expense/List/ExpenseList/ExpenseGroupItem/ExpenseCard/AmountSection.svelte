<script lang="ts">
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
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

  const paymentMode = $derived(
    useBudgetStore.data.find((item) => item._id === expense.budgetId)?.paymentMode ||
      expense.paymentMode,
  );
</script>

<section class="AmountSection">
  <PaymentModeFormattedOption {paymentMode} hideLabel />
  <FormattedCurrency value={expense.amount} {currency} />
</section>

<style lang="scss">
  .AmountSection {
    display: flex;
    align-items: center;
    font-weight: 500;
    flex-wrap: wrap;
    position: relative;
    top: -6px;

    :global(.Logo) {
      width: 30px;
      height: 30px;
      font-size: 1.2rem;
    }
  }
</style>
