<script lang="ts">
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { getCurrencyWiseExpense } from '$lib/stores/expense/expense.svelte';
  import type { PaymentModeWiseExpense } from '$lib/stores/statistics/types';

  interface ItemProps {
    data: PaymentModeWiseExpense;
  }

  const { data }: ItemProps = $props();

  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(data.expenses));
</script>

<tr>
  <td><PaymentModeFormattedOption paymentMode={data.paymentMode} /></td>
  <td>
    <ul>
      {#if expenseCurrencyWise.length}
        {#each expenseCurrencyWise as item}
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
</style>
