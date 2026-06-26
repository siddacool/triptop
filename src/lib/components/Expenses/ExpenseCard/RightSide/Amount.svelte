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

  const classes = $derived(
    ['ExpenseCardAmount', expense.archived ? 'archived' : ''].filter(Boolean),
  );
</script>

<Threshold
  class={classes.join(' ')}
  value={expense.amount}
  threshold={0}
  colorMap={{ above: 'default' }}
>
  <Money
    value={expense.amount}
    currency={trip.currency}
    {locale}
    options={{ maximumFractionDigits: 2 }}
  />
</Threshold>

<style lang="scss">
  :global(.ExpenseCardAmount) {
    &.archived {
      text-decoration: line-through;
    }
  }

  :global(.ExpenseCardAmount.dodo-ui-Text) {
    color: var(--dodo-color-neutral-800);
  }
</style>
