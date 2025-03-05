<script lang="ts">
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import StatsTable from '../StatsTable.svelte';
  import Item from './Item.svelte';
</script>

<StatsTable title="Payment Mode">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {#each paymentModeOptions as paymentModeOption (paymentModeOption.value)}
      <Item data={paymentModeOption} />
    {/each}
  </tbody>
</StatsTable>

<style>
</style>
