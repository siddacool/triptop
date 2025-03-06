<script lang="ts">
  import { page } from '$app/state';
  import {
    getBudgetWiseExpense,
    useStatisticsStore,
  } from '$lib/stores/statistics/statistics.svelte';
  import StatsTable from '../StatsTable.svelte';
  import Item from './Item.svelte';

  const tripId = page.params.tripId;

  const budgets = $derived(
    getBudgetWiseExpense(tripId, useStatisticsStore.startDate, useStatisticsStore.endDate),
  );
</script>

<StatsTable title="Budgets" name="budget">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {#each budgets as budget (budget.name)}
      <Item data={budget} />
    {/each}
  </tbody>
</StatsTable>

<style>
</style>
