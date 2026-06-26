<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(
    ['ExpenseCardExchangeRate', expense.archived ? 'archived' : ''].filter(Boolean),
  );
</script>

<HomeCurrencyExchange class={classes.join(' ')} amount={expense.amount} />

<style lang="scss">
  :global(.ExpenseCardExchangeRate.HomeCurrencyExchange) {
    &.archived {
      text-decoration: line-through;
    }

    margin-top: var(--dodo-ui-space);
    font-size: 0.85rem;
  }
</style>
