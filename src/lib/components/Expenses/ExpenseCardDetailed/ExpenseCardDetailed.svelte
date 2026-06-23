<script lang="ts">
  import { type Expense } from '$lib/stores/expense/types';
  import { Card, Column, Grid, Money, Threshold } from '@flightlesslabs/dodo-ui';
  import { type Trip } from '$lib/stores/trip/types';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import { createDate } from '@flightlesslabs/time-utils';
  import DeletedPill from './DeletedPill.svelte';
  import CategoryShowCase from '$lib/components/ui/Category/CategoryShowCase/CategoryShowCase.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';

  type Props = {
    expense: Expense;
    trip: Trip;
    class?: string;
  };

  let { expense, trip, class: className = '' }: Props = $props();

  const locale = $derived(trip.locale || useSettingsStore.settings.locale);

  const classes = $derived(
    ['ExpenseCardDetailed', expense.archived ? 'archived' : '', className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  <Card class="ExpenseCardDetailedCard" roundness={1} outline shadow={0}>
    <Grid gap={2}>
      <Column>
        <div class="HeadingSection">
          <FieldValue size="large">
            <Threshold
              value={expense.amount}
              threshold={0}
              colorMap={{ above: 'default' }}
              class="Amount"
            >
              <Money
                value={expense.amount}
                currency={trip.currency}
                {locale}
                options={{ maximumFractionDigits: 2 }}
              />
            </Threshold>
          </FieldValue>

          {#if expense.archived}
            <DeletedPill />
          {/if}
        </div>
      </Column>
      <Column>
        <FieldValue>
          {expense.name}
        </FieldValue>
      </Column>
      <Column>
        <div class="details">
          <FieldValue size="small">
            <CategoryShowCase value={expense.category} />
          </FieldValue>
          <FieldValue size="small">
            {createDate(expense.date).format('ddd, MMM D, YYYY')}
          </FieldValue>
        </div>
      </Column>
      <Column>
        <FieldValue label="Trip:">
          {useTripStore.trip?.name || ''}
        </FieldValue>
      </Column>
    </Grid>
  </Card>
</div>

<style lang="scss">
  .ExpenseCardDetailed {
    display: flex;
    flex-direction: column;

    .HeadingSection {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
    }

    .details {
      display: flex;

      :global(.FieldValue) {
        margin-right: calc(var(--dodo-ui-space) * 3);

        &:last-child {
          margin: 0;
        }
      }

      :global(.CategoryShowCase .CategoryIcon) {
        font-size: 1.1rem;
      }
    }

    :global(.ExpenseCardDetailedCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    :global(.Amount) {
      color: var(--dodo-color-neutral-800);
    }

    &.archived {
      :global(.Amount) {
        text-decoration: line-through;
      }
    }
  }
</style>
