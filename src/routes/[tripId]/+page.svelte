<script lang="ts">
  import { page } from '$app/state';
  import CurrencyAndAmount from '$lib/components/CurrencyAndAmount.svelte';
  import ExpenseCardDateGroup from '$lib/components/Expense/ExpenseCardDateGroup';
  import Header from '$lib/components/Header.svelte';
  import {
    getCurrencyWiseTotal,
    getDateWiseExpenses,
    useExpensesStore,
    type CurrencyWiseTotal,
    type DateWiseExpense,
  } from '$lib/stores/expense/list.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import Loader from '$lib/ui-lib/Loader';
  import { Column, Grid } from '@flightlesslabs/grid';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;

  let curruncyWiseTotal = $state<CurrencyWiseTotal[]>([]);
  let dateWiseExpenses = $state<DateWiseExpense[]>([]);

  onMount(async () => {
    if (!tripId) {
      return;
    }

    await useTripStore.fetch(tripId);
    await useExpensesStore.fetch(tripId);

    curruncyWiseTotal = [...getCurrencyWiseTotal(useExpensesStore.data || [])];
    dateWiseExpenses = [...getDateWiseExpenses(useExpensesStore.data || [])];
  });

  onMount(() => {
    return () => {
      useTripStore.reset();
      useExpensesStore.reset();
    };
  });
</script>

<div class="TripDetails">
  <Grid spacing={4}>
    <Column>
      <Header backTo="/" aria-label="Back to trips">
        {useTripStore.data?.name}
        {#snippet after()}
          <Button href={`/${tripId}/edit`} aria-label="Edit trip" compact class="EditTrip">
            <Icon icon="material-symbols:edit" />
          </Button>
        {/snippet}
      </Header>
    </Column>
    {#if useTripStore.fetching}
      <Column>
        <Loader />
      </Column>
    {:else if useTripStore.data?._id}
      <Column>
        <Card>
          <h3>Total Expense:</h3>
          <ul>
            {#if curruncyWiseTotal.length}
              {#each curruncyWiseTotal as item (item.currency)}
                <li>
                  <CurrencyAndAmount currency={item.currency} amount={item.total} />
                </li>
              {/each}
            {:else}
              <li><CurrencyAndAmount amount={0} /></li>
            {/if}
          </ul>
        </Card>
      </Column>
      <Column>
        <div class="create-button-holder">
          <Button href={`/${tripId}/add-expense`} aria-label="Add Expense" color="primary">
            <Icon icon="material-symbols:add" /> Add Expense
          </Button>
        </div>
      </Column>

      {#if dateWiseExpenses.length}
        <Column>
          <div class="expenses">
            <Grid spacing={2}>
              {#each dateWiseExpenses as expense (expense.date)}
                <Column>
                  <ExpenseCardDateGroup data={expense} />
                </Column>
              {/each}
            </Grid>
          </div>
        </Column>
      {/if}
    {/if}
  </Grid>
</div>

<style lang="scss">
  .TripDetails {
    .create-button-holder {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin-top: 0;
    }

    ul {
      display: block;
      margin: 0;
      padding: 0;

      li {
        display: block;
        margin: 0;
        padding: 0;
        margin-bottom: 6px;
      }
    }
  }
</style>
