<script lang="ts">
  import { page } from '$app/state';
  import {
    getPaymentModeWiseExpense,
    useStatisticsStore,
  } from '$lib/stores/statistics/statistics.svelte';
  import StatsTable from '../StatsTable.svelte';
  import Item from './Item.svelte';

  const tripId = page.params.tripId;

  const paymentModes = $derived(
    getPaymentModeWiseExpense(tripId, useStatisticsStore.startDate, useStatisticsStore.endDate),
  );
</script>

<StatsTable title="Payment Mode" name="paymentMode">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {#each paymentModes as paymentMode (paymentMode.paymentMode)}
      <Item data={paymentMode} />
    {/each}
  </tbody>
</StatsTable>

<style>
</style>
