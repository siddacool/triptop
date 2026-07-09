<script lang="ts">
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { getExpensesTotal } from '$lib/stores/expense/getters/total-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  const total = $derived(getExpensesTotal(useExpenseListStore.filtredExpenses));
  const locale = $derived(tripDetailStore?.trip?.locale);
</script>

{#if tripDetailStore.trip}
  <Threshold value={total} threshold={0} colorMap={{ above: 'default' }}>
    <Money
      value={total}
      currency={tripDetailStore.trip.currency}
      {locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>
{/if}
