<script lang="ts">
  import { getExpensesTotal } from '$lib/stores/expense/getters/total-expenses';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  const total = $derived(getExpensesTotal(useExpenseListStore.filtredExpenses));
  const locale = $derived(useTripStore?.trip?.locale);
</script>

{#if useTripStore.trip}
  <Threshold value={total} threshold={0} colorMap={{ above: 'default' }}>
    <Money
      value={total}
      currency={useTripStore.trip.currency}
      {locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>
{/if}
