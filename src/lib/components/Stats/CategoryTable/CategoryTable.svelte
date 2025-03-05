<script lang="ts">
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import StatsTable from '../StatsTable.svelte';
  import Item from './Item.svelte';
</script>

<StatsTable title="Category">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {#each categoryOptions as categoryOption (categoryOption.value)}
      <Item data={categoryOption} />
    {/each}
  </tbody>
</StatsTable>

<style>
</style>
