<script lang="ts">
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { getCurrencyWiseExpense } from '$lib/stores/expense/expense.svelte';
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';

  interface Props {
    expenseGroup: ExpenseDateGroup;
  }

  const { expenseGroup }: Props = $props();
  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(expenseGroup.expenses));
</script>

{#if expenseCurrencyWise.length}
  <ul class="total">
    {#each expenseCurrencyWise as item (item.currency)}
      <li>{item.currency} <FormattedCurrency value={item.total} currency={item.currency} /></li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  .total {
    margin: 0;
    margin-bottom: 8px;
    margin-top: 6px;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
      display: block;
      font-size: 0.8rem;
      margin-bottom: 4px;
      font-weight: 500;
      color: var(--color-grey-font-600);
    }
  }
</style>
