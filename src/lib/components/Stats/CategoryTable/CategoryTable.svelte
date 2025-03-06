<script lang="ts">
  import { page } from '$app/state';
  import {
    getCategoryWiseExpense,
    useStatisticsStore,
  } from '$lib/stores/statistics/statistics.svelte';
  import StatsTable from '../StatsTable.svelte';
  import Item from './Item.svelte';

  const tripId = page.params.tripId;

  const categories = $derived(
    getCategoryWiseExpense(tripId, useStatisticsStore.startDate, useStatisticsStore.endDate),
  );
</script>

<StatsTable title="Category" name="category">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {#each categories as category (category.category)}
      <Item data={category} />
    {/each}
  </tbody>
</StatsTable>

<style>
</style>
