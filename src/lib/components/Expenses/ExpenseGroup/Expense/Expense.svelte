<script lang="ts">
  import type { ExpenseGroupExpense } from '$lib/stores/expense/getters/group-expenses';
  import ExpenseCard from '../../ExpenseCard/ExpenseCard.svelte';
  import type { Trip } from '$lib/stores/trip/types';

  type Props = {
    data: ExpenseGroupExpense;
    trip: Trip;
  };

  let { data, trip }: Props = $props();
</script>

<li class="Expense">
  <ExpenseCard expense={data.expense} {trip} />
</li>

<style lang="scss">
  .Expense {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: var(--dodo-ui-space);
  }
</style>
