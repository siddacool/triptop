<script lang="ts">
  import { page } from '$app/state';
  import CategoryFormattedOption from '$lib/components/Expense/CategoryFormattedOption.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { getCurrencyWiseExpense, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { CategoryOption } from '$lib/stores/expense/types';

  interface ItemProps {
    data?: CategoryOption;
  }

  const { data }: ItemProps = $props();
  const tripId = page.params.tripId;
  const expenses = $derived(
    useExpenseStore.data.filter((item) => item.tripId === tripId && item.category === data?.value),
  );
  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(expenses));
</script>

<tr>
  <td><CategoryFormattedOption category={data?.value} /></td>
  <td>
    <ul>
      <ul>
        {#if expenseCurrencyWise.length}
          {#each expenseCurrencyWise as item}
            <li>
              {item.currency || DEFUALT_CURRENCY.alphabeticCode}
              <FormattedCurrency value={item.total || 0} currency={item.currency} />
            </li>
          {/each}
        {:else}
          <li>-</li>
        {/if}
      </ul>
    </ul>
  </td>
</tr>

<style lang="scss">
</style>
