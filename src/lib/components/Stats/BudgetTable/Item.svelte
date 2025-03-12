<script lang="ts">
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { getCurrencyWiseExpense } from '$lib/stores/expense/expense.svelte';
  import type { BudgetWiseStatsExpense } from '$lib/stores/statistics/types';

  interface ItemProps {
    data: BudgetWiseStatsExpense;
  }

  const { data }: ItemProps = $props();

  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(data.expenses));
</script>

<tr>
  <td>
    <div class="holder">
      <PaymentModeFormattedOption paymentMode={data.paymentMode} hideLabel />
      {data.name}
    </div>
  </td>
  <td>
    <ul>
      {#if expenseCurrencyWise.length}
        {#each expenseCurrencyWise as item (item.currency)}
          <li>
            {item.currency || DEFUALT_CURRENCY.alphabeticCode}
            <FormattedCurrency value={item.total} currency={item.currency} />
          </li>
        {/each}
      {:else}
        <li>-</li>
      {/if}
    </ul>
  </td>
</tr>

<style lang="scss">
  .holder {
    display: flex;
    align-items: center;
  }
</style>
