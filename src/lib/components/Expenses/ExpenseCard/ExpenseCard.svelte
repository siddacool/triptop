<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import { Card, type CardColor } from '@flightlesslabs/dodo-ui';
  import { resolve } from '$app/paths';
  import type { Trip } from '$lib/stores/trip/types';
  import LeftSide from './LeftSide/LeftSide.svelte';
  import RightSide from './RightSide/RightSide.svelte';

  type Props = {
    expense: Expense;
    trip: Trip;
    class?: string;
  };

  let { expense, trip, class: className = '' }: Props = $props();

  let cardColor = $state<CardColor>('default');

  function handleOnHover() {
    cardColor = 'primary';
  }

  function handleOnBlur() {
    cardColor = 'default';
  }

  const classes = $derived(
    ['ExpenseCard', expense.archived ? 'archived' : '', className].filter(Boolean),
  );
</script>

<a
  class={classes.join(' ')}
  href={resolve(`/trips/${expense.tripId}/expenses/${expense._id}`)}
  onmouseover={handleOnHover}
  onfocus={handleOnHover}
  onmouseout={handleOnBlur}
  onblur={handleOnBlur}
>
  <Card class="ExpenseCardCard" roundness={1} active color={cardColor}>
    <LeftSide {expense} />
    <RightSide {expense} {trip} />
  </Card>
</a>

<style lang="scss">
  .ExpenseCard {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-bottom: var(--dodo-ui-space);
    color: var(--dodo-color-neutral-800);
    text-decoration: none;
    display: flex;
    flex-direction: column;

    :global(.ExpenseCardCard) {
      padding: var(--dodo-ui-space);
      display: flex;
    }

    &.archived {
      opacity: 0.6;
    }
  }
</style>
