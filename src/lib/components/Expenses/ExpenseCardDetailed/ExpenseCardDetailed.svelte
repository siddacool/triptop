<script lang="ts">
  import { type Expense } from '$lib/stores/expense/types';
  import { Card, Column, Grid, Money, Row, Threshold } from '@flightlesslabs/dodo-ui';
  import { DEFAULT_LOCALE, type Trip } from '$lib/stores/trip/types';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import { createDate } from '@flightlesslabs/time-utils';
  import DeletedPill from './DeletedPill.svelte';
  import CategoryShowCase from '$lib/components/ui/Category/CategoryShowCase/CategoryShowCase.svelte';

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
  <Card class="ExpenseCardDetailedCard" roundness={1} outline shadow={0}>
    {#if expense.archived}
      <DeletedPill />
    {/if}
    <Grid gap={2}>
      <Column>
        <FieldValue label="Amount:" size="large">
          <Threshold
            value={expense.amount}
            threshold={0}
            colorMap={{ above: 'default' }}
            class="Amount"
          >
            <Money
              value={expense.amount}
              currency={trip.currency}
              locale={trip.locale || DEFAULT_LOCALE}
              options={{ maximumFractionDigits: 2 }}
            />
          </Threshold>
        </FieldValue>
      </Column>
      <Column>
        <FieldValue label="Description:">
          {expense.name}
        </FieldValue>
      </Column>
      <Row>
        <Column>
          <FieldValue label="Category:">
            <CategoryShowCase value={expense.category} />
          </FieldValue>
        </Column>
        <Column>
          <FieldValue label="Date:">
            {createDate(expense.date).format('ddd, MMM D, YYYY')}
          </FieldValue>
        </Column>
      </Row>
    </Grid>
  </Card>
</div>

<style lang="scss">
  .ExpenseCardDetailed {
    display: flex;
    flex-direction: column;

    :global(.ExpenseCardDetailedCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    :global(.Amount) {
      color: var(--dodo-color-neutral-800);
    }

    &.archived {
      opacity: 0.7;

      :global(.Amount) {
        text-decoration: line-through;
      }
    }
  }
</style>
