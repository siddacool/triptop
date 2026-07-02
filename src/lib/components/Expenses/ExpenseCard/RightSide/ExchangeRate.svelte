<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(
    ['ExpenseCardExchangeRate', expense.archived ? 'archived' : ''].filter(Boolean),
  );

  const tripEnableCurrencyConversion = $derived(
    useTripStore.trip?.enableCurrencyConversion === false ? false : true,
  );
</script>

{#if tripEnableCurrencyConversion}
  <HomeCurrencyExchange
    class={classes.join(' ')}
    amount={expense.virtualData?.amountHomeCurrency}
  />
{/if}

<style lang="scss">
  :global(.ExpenseCardExchangeRate.HomeCurrencyExchange) {
    &.archived {
      text-decoration: line-through;
    }

    margin-top: var(--dodo-ui-space);
    font-size: 0.85rem;
  }
</style>
