<script lang="ts">
  import type { Trip } from '$lib/features/trip/types';
  import LeftSide from './LeftSide/LeftSide.svelte';
  import RightSide from './RightSide/RightSide.svelte';
  import ExpenseCardAnchor from './ExpenseCardAnchor.svelte';
  import type { Expense } from '../../types';

  type Props = {
    expense: Expense;
    trip: Trip;
    class?: string;
  };

  let { expense, trip, class: className = '' }: Props = $props();

  const classes = $derived(['ExpenseCard', className].filter(Boolean));
</script>

<ExpenseCardAnchor {expense} class={classes.join(' ')}>
  <LeftSide {expense} />
  <RightSide {expense} {trip} />
</ExpenseCardAnchor>
