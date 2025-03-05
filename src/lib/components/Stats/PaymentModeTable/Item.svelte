<script lang="ts">
  import { page } from '$app/state';
  import PaymentModeFormattedOption from '$lib/components/PaymentMode/PaymentModeFormattedOption.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import {
    getCurrencyWiseExpense,
    getExpenseWithBudgetDetails,
    useExpenseStore,
  } from '$lib/stores/expense/expense.svelte';
  import { PaymentModes, type PaymentModeOption } from '$lib/stores/payment-mode/types';

  interface ItemProps {
    data?: PaymentModeOption;
  }

  const { data }: ItemProps = $props();
  const tripId = page.params.tripId;
  const allExpenses = $derived(getExpenseWithBudgetDetails(useExpenseStore.data));

  const expenses = $derived(
    allExpenses.filter(
      (item) => (item.tripId === tripId && item.paymentMode === data?.value) || PaymentModes.CASH,
    ),
  );
  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(expenses));
</script>

<tr>
  <td><PaymentModeFormattedOption paymentMode={data?.value} /></td>
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
