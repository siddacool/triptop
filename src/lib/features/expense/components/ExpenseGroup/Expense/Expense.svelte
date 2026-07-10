<script lang="ts">
  import ExpenseCard from '../../ExpenseCard/ExpenseCard.svelte';
  import type { ExpenseGroupExpense } from '$lib/features/expense/utils/group-expenses/group-expenses';
  import type { Trip } from '$lib/features/trip/types';

  type Props = {
    data: ExpenseGroupExpense;
    trip: Trip;
  };

  let { data, trip }: Props = $props();
</script>

<ExpenseCard expense={data.expense} {trip} />
