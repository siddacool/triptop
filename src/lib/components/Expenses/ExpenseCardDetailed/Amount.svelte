<script lang="ts">
  import { type Expense } from '$lib/stores/expense/types';
  import { Money, Threshold } from '@flightlesslabs/dodo-ui';
  import { type Trip } from '$lib/stores/trip/types';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import ExpenseAmountExchangeValue from '$lib/components/ui/MoneyExchangeValue/ExpenseAmountExchangeValue.svelte';

  type Props = {
    expense: Expense;
    trip: Trip;
    class?: string;
  };

  let { expense, trip, class: className = '' }: Props = $props();

  const locale = $derived(trip.locale);

  const classes = $derived(
    ['Amount', expense.archived ? 'archived' : '', className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  <FieldValue size="large">
    <Threshold
      value={expense.amount}
      threshold={0}
      colorMap={{ above: 'default' }}
      class="ExpenseAmount"
    >
      <Money
        value={expense.amount}
        currency={trip.currency}
        {locale}
        options={{ maximumFractionDigits: 2 }}
      />
    </Threshold>
  </FieldValue>
  <ExpenseAmountExchangeValue amount={expense.amount} />
</div>

<style lang="scss">
  .Amount {
    :global(.ExpenseAmount) {
      color: var(--dodo-color-neutral-800);
    }

    &.archived {
      :global(.ExpenseAmount) {
        text-decoration: line-through;
      }

      :global(.ExpenseAmountExchangeValue) {
        text-decoration: line-through;
      }
    }

    :global(.ExpenseAmountExchangeValue) {
      margin-top: var(--dodo-ui-space);
      font-size: 1rem;
    }
  }
</style>
