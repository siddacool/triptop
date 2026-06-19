<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import { Card, type CardColor } from '@flightlesslabs/dodo-ui';
  import Title from './Title.svelte';
  import Amount from './Amount.svelte';
  import { resolve } from '$app/paths';
  import type { Trip } from '$lib/stores/trip/types';
  import MetaData from './MetaData.svelte';

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

<li
  class={classes.join(' ')}
  onmouseover={handleOnHover}
  onfocus={handleOnHover}
  onmouseout={handleOnBlur}
  onblur={handleOnBlur}
>
  <a href={resolve(`/trips/${expense.tripId}/expenses/${expense._id}`)}>
    <Card class="ExpenseCardCard" roundness={1} active color={cardColor}>
      <div class="base-info">
        <Title {expense} />
        <Amount {expense} {trip} />
      </div>
      <MetaData {expense} />
    </Card>
  </a>
</li>

<style lang="scss">
  .ExpenseCard {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-bottom: var(--dodo-ui-space);

    a {
      color: var(--dodo-color-neutral-800);
      text-decoration: none;
      display: flex;
      flex-direction: column;
    }

    .base-info {
      display: flex;
    }

    :global(.ExpenseCardCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    &.archived {
      opacity: 0.6;
    }
  }
</style>
