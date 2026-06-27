<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
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
  <HomeCurrencyExchange amount={amountHomeCurrencyTotal} class="TotalExpensesTotalHomeCurrency" />
{/if}

<style lang="scss">
  :global(.TotalExpensesTotalHomeCurrency.HomeCurrencyExchange) {
    margin-top: var(--dodo-ui-space);
    font-size: 0.9rem;
  }
</style>
