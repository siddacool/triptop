<script lang="ts">
  import { page } from '$app/state';
  import AmountDisplay from '$lib/components/ui-framework/FormattedInfo/AmountDisplay.svelte';
  import { getCurrencyWiseExpenseForTrip } from '$lib/stores/expense/expense.svelte';
  import Heading from './Heading.svelte';

  const tripId = page.params.tripId;

  const expenses = $derived(getCurrencyWiseExpenseForTrip(tripId));
</script>

<div class="TotalExpense">
  <Heading title="Total Expense" />
  <ul>
    {#each expenses as expense (expense.currency)}
      <li>
        <AmountDisplay currency={expense.currency} value={expense.total} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .TotalExpense {
    padding: 16px 16px;
    padding-top: 8px;
    padding-bottom: 8px;

    ul {
      margin: 0;
      padding: 0;
      display: block;
    }

    li {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 0.85rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
