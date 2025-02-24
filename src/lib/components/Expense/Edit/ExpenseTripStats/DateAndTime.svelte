<script lang="ts">
  import { page } from '$app/state';
  import { StatsItem } from '$lib/components/StatsCard';
  import { getMoment } from '$lib/helpers/time';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';

  const id = page.params.expenseId;
  const targetExpense = $derived(useExpenseStore.data.find((item) => item._id === id));
</script>

<StatsItem>
  {#snippet label()}
    Date and time
  {/snippet}
  {#snippet value()}
    {getMoment(targetExpense?.date).format('MMM,D YYYY')}
    {getMoment(targetExpense?.date).format('hh:mm A')}
  {/snippet}
</StatsItem>
