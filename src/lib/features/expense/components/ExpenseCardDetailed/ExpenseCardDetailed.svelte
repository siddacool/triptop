<script lang="ts">
  import { type Expense } from '$lib/stores/expense/types';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import type { Trip } from '$lib/features/trip/types';
  import ArchivedPill from './ArchivedPill.svelte';
  import Amount from './Amount.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
  import Category from './Category.svelte';
  import ExpenseDate from './ExpenseDate.svelte';
  import TripName from './TripName.svelte';
  import ExpenseName from './ExpenseName.svelte';

  type Props = {
    expense: Expense;
    trip: Trip;
    class?: string;
  };

  let { expense, trip, class: className = '' }: Props = $props();

  const classes = $derived(
    ['ExpenseCardDetailed', expense.archived ? 'archived' : '', className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  <Grid gap={2}>
    <ArchivedPill {expense} />
    <ExpenseName {expense} />
    <Amount {trip} {expense} />
    <Column>
      <Divider />
    </Column>
    <Category {expense} />
    <ExpenseDate {expense} />
    <Column>
      <Divider />
    </Column>
    <TripName {trip} />
  </Grid>
</div>

<style lang="scss">
  .ExpenseCardDetailed {
    display: flex;
    flex-direction: column;

    :global(.ExpenseCardDetailedCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
