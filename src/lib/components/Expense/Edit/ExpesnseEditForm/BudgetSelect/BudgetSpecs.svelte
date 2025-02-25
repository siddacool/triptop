<script lang="ts">
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { getExpenseUsedBudget } from '$lib/stores/expense/expense.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';

  interface Props {
    budgetId: string;
  }

  const { budgetId }: Props = $props();

  const targetBudget = $state(useBudgetStore.data.find((item) => item._id === budgetId));
  const usedBudget = $derived(getExpenseUsedBudget(budgetId) || 0);
  const remainingBudget = $derived(targetBudget?.amount || 0 - usedBudget);
</script>

{#if targetBudget}
  <article>
    <span class="paymentMode">
      {paymentModeOptions.find((item) => item.value === targetBudget.paymentMode)?.label ||
        paymentModeOptions[0].label}
    </span>
    <span class="currency">
      Currency: {targetBudget?.currency || DEFUALT_CURRENCY.alphabeticCode}
    </span>
    <span class="currency">
      <FormattedCurrency
        value={remainingBudget}
        currency={targetBudget.currency}
        class="remaining"
      /> / <FormattedCurrency
        value={targetBudget.amount}
        currency={targetBudget.currency}
        class="total"
      />
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

      :global(.remaining) {
        color: var(--color-danger-800);
      }

      :global(.total) {
        color: var(--color-primary-800);
      }
    }
  }
</style>
