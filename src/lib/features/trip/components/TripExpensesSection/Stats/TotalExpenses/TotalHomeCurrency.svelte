<script lang="ts">
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  const tripEnableCurrencyConversion = $derived(
    tripDetailStore.trip?.enableCurrencyConversion === false ? false : true,
  );
  const allExpensesOk = $derived(
    expenseListStore.expensesFiltred.every(
      (item) => item.virtualData?.amountHomeCurrency || item.virtualData?.amountHomeCurrency === 0,
    ),
  );
  const isShow = $derived(tripEnableCurrencyConversion && allExpensesOk);
</script>

{#if isShow}
  <HomeCurrencyExchange
    amount={expenseListStore.totalAmountHomeCurrency}
    class="TotalExpensesTotalHomeCurrency"
  />
{/if}

<style lang="scss">
  :global(.TotalExpensesTotalHomeCurrency.HomeCurrencyExchange) {
    margin-top: var(--dodo-ui-space);
    font-size: 0.9rem;
  }
</style>
