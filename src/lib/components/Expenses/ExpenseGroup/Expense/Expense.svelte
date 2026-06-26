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

<ExpenseCard expense={data.expense} {trip} />
