<script lang="ts">
  import { type Expense } from '$lib/stores/expense/types';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import { type Trip } from '$lib/stores/trip/types';
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import DeletedPill from './DeletedPill.svelte';
  import CategoryShowCase from '$lib/components/ui/Category/CategoryShowCase/CategoryShowCase.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Amount from './Amount.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
  import { createDate } from '$lib/helpers/date-time/createDate';

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
    <Column>
      <div class="HeadingSection">
        <Amount {trip} {expense} />
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
      <Divider />
    </Column>
    <Column>
      <FieldValue size="small">
        <CategoryShowCase value={expense.category} />
      </FieldValue>
    </Column>
    <Column>
      <FieldValue size="small">
        {createDate(expense.date).format('ddd, MMM D, YYYY')}
      </FieldValue>
    </Column>
    <Column>
      <Divider />
    </Column>
    <Column>
      <FieldValue label="Trip:">
        {useTripStore.trip?.name || ''}
      </FieldValue>
    </Column>
  </Grid>
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
  }
</style>
