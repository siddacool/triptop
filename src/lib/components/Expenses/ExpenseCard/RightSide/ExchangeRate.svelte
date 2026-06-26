<script lang="ts">
  import ExpenseAmountExchangeValue from '$lib/components/ui/MoneyExchangeValue/ExpenseAmountExchangeValue.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(
    ['ExpenseCardExchangeRate', expense.archived ? 'archived' : ''].filter(Boolean),
  );
</script>

<ExpenseAmountExchangeValue
  class={classes.join(' ')}
  amount={expense.virtualData?.amountHomeCurrency}
/>

<style lang="scss">
  :global(.ExpenseCardExchangeRate.ExpenseAmountExchangeValue) {
    &.archived {
      text-decoration: line-through;
    }

    margin-top: var(--dodo-ui-space);
    font-size: 0.85rem;
  }
</style>
