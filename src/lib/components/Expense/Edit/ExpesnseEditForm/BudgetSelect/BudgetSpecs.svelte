<script lang="ts">
  import RemainingAmount from '$lib/components/ui-framework/FormattedInfo/RemainingAmount.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { getExpenseUsedBudget, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';

  interface Props {
    budgetId: string;
    expenseId?: string;
    amount?: number;
  }

  const { budgetId, expenseId, amount = 0 }: Props = $props();

  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === budgetId));
  const targetBudgetAmount = $derived(
    useBudgetStore.data.find((item) => item._id === budgetId)?.amount || 0,
  );
  const targetExpenseAmount = $derived(
    useExpenseStore.data.find((item) => item._id === expenseId && item.budgetId === budgetId)
      ?.amount || 0,
  );

  let usedAmount = $state(0);

  $effect(() => {
    // console.log(targetExpenseAmount, amount, usedBudget);

    let usedBudget = getExpenseUsedBudget(budgetId) || 0;

    // remove old target expense amount
    usedBudget = usedBudget - targetExpenseAmount;

    // add new amount
    usedBudget = usedBudget + amount;

    usedAmount = isNaN(usedBudget) ? targetBudgetAmount : usedBudget;
  });
</script>

{#if targetBudget}
  <article>
    <span class="paymentMode">
      {paymentModeOptions.find((item) => item.value === targetBudget.paymentMode)?.label ||
        paymentModeOptions[0].label}
    </span>
    <span class="currency">
      {targetBudget?.currency || DEFUALT_CURRENCY.alphabeticCode}
    </span>
    <span class="currency">
      <RemainingAmount total={targetBudgetAmount} {usedAmount} currency={targetBudget.currency} />
    </span>
  </article>
{/if}

<style lang="scss">
  article {
    margin-top: 8px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-weight: 500;
    background-color: var(--color-grey-200);
    padding: 8px;
    border-radius: 8px;

    span {
      display: inline-flex;
      align-items: center;
    }

    .currency {
      margin-left: 16px;
    }
  }
</style>
