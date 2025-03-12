<script lang="ts">
  import CategoryFormattedOption from '$lib/components/Expense/CategoryFormattedOption.svelte';
  import FormattedCurrency from '$lib/components/ui-framework/FormattedInfo/FormattedCurrency.svelte';
  import { DEFUALT_CURRENCY } from '$lib/stores/currency/currency-codes';
  import { getCurrencyWiseExpense } from '$lib/stores/expense/expense.svelte';
  import type { CategoryWiseStatsExpense } from '$lib/stores/statistics/types';

  interface ItemProps {
    data: CategoryWiseStatsExpense;
  }

  const { data }: ItemProps = $props();

  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(data.expenses));
</script>

<tr>
  <td><CategoryFormattedOption category={data?.category} /></td>
  <td>
    <ul>
      <ul>
        {#if expenseCurrencyWise.length}
          {#each expenseCurrencyWise as item (item.currency)}
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
