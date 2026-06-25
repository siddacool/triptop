<script lang="ts">
  import type { Expense } from '$lib/stores/expense/types';
  import { type Trip } from '$lib/stores/trip/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';

  type Props = {
    expense: Expense;
    trip: Trip;
  };

  let { expense, trip }: Props = $props();

  const locale = $derived(trip.locale);

  const classes = $derived(['Amount', expense.archived ? 'archived' : ''].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Threshold value={expense.amount} threshold={0} colorMap={{ above: 'default' }}>
    <Money
      value={expense.amount}
      currency={trip.currency}
      {locale}
      options={{ maximumFractionDigits: 2 }}
    />
  </Threshold>
</div>

<style lang="scss">
  .Amount {
    &.archived {
      text-decoration: line-through;
    }

    :global(.dodo-ui-Text) {
      color: var(--dodo-color-neutral-800);
    }
  }
</style>
