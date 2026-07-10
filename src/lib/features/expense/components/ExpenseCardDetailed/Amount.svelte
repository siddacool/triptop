<script lang="ts">
  import { type Expense } from '$lib/stores/expense/types';
  import { Column, Money, Threshold } from '@flightlesslabs/dodo-ui';
  import { type Trip } from '$lib/stores/trip/types';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import HomeCurrencyExchange from '$lib/components/ui/HomeCurrencyExchange/HomeCurrencyExchange.svelte';

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

<Column>
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

    {#if trip.enableCurrencyConversion !== false}
      <HomeCurrencyExchange amount={expense.virtualData?.amountHomeCurrency} />
    {/if}
  </div>
</Column>

<style lang="scss">
  .Amount {
    :global(.ExpenseAmount) {
      color: var(--dodo-color-neutral-800);
    }

    &.archived {
      :global(.ExpenseAmount) {
        text-decoration: line-through;
      }

      :global(.HomeCurrencyExchange) {
        text-decoration: line-through;
      }
    }

    :global(.HomeCurrencyExchange) {
      margin-top: var(--dodo-ui-space);
      font-size: 1rem;
    }
  }
</style>
