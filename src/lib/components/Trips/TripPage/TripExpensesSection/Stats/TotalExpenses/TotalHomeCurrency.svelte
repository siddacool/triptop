<script lang="ts">
  import ExpenseAmountExchangeValue from '$lib/components/ui/MoneyExchangeValue/ExpenseAmountExchangeValue.svelte';
  import { getExpensesTotalAmountHomeCurrency } from '$lib/stores/expense/getters/total-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  const amountHomeCurrencyTotal = $derived(
    getExpensesTotalAmountHomeCurrency(useExpenseListStore.filtredExpenses),
  );
  const isShow = $derived(
    useExpenseListStore.filtredExpenses.every(
      (item) => item.virtualData?.amountHomeCurrency || item.virtualData?.amountHomeCurrency === 0,
    ),
  );
</script>

{#if isShow}
  <ExpenseAmountExchangeValue
    amount={amountHomeCurrencyTotal}
    class="TotalExpensesTotalHomeCurrency"
  />
{/if}

<style lang="scss">
  :global(.TotalExpensesTotalHomeCurrency.ExpenseAmountExchangeValue) {
    margin-top: var(--dodo-ui-space);
    font-size: 0.9rem;
  }
</style>
