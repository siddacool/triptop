<script lang="ts">
  import { expenseListStore } from '$lib/features/expense/store/list.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';
</script>

{#if tripDetailStore.trip}
  <Threshold value={expenseListStore.totalAmount} threshold={0} colorMap={{ above: 'default' }}>
    <Money
      value={expenseListStore.totalAmount}
      currency={tripDetailStore.trip.currency}
      locale={tripDetailStore?.trip?.locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>
{/if}
