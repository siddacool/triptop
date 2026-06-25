<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import type { Expense } from '$lib/stores/expense/types';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(['ExchangeRate', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <HomeCurrencyExchange amount={expense.amount} />
</div>

<style lang="scss">
  .ExchangeRate {
    &.archived {
      text-decoration: line-through;
    }

    :global(.HomeCurrencyExchange) {
      margin-top: var(--dodo-ui-space);
      font-size: 0.85rem;
    }
  }
</style>
