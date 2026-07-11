<script lang="ts">
  import HomeCurrencyExchange from '$lib/features/exchange/components/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import type { Expense } from '$lib/features/expense/types';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';

  type Props = {
    expense: Expense;
  };

  let { expense }: Props = $props();

  const classes = $derived(
    ['ExpenseCardExchangeRate', expense.archived ? 'archived' : ''].filter(Boolean),
  );

  const tripEnableCurrencyConversion = $derived(
    tripDetailStore.trip?.enableCurrencyConversion === false ? false : true,
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
