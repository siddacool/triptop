<script lang="ts">
  import { page } from '$app/state';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { paymentModeOptions } from '$lib/stores/payment-mode/payment-mode.svelte';
  import PaymentModeListItem from './PaymentModeListItem.svelte';

  const tripId = page.params.id;

  // Total expense
  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === tripId));

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<tr class="header">
  <td colspan="3" class="seperator"></td>
</tr>
<tr class="header">
  <td colspan="3">Payment Mode</td>
</tr>
{#each paymentModeOptions as paymentMode}
  <PaymentModeListItem {paymentMode} {totalExpenses} />
{/each}

<style lang="scss">
  td {
    font-weight: 600;
    font-size: 1.2rem;
  }

  .seperator {
    border-bottom: 0;
  }
</style>
