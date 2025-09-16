<script lang="ts">
  import { page } from '$app/state';
  import CurrencyAndAmount from '$lib/components/CurrencyAndAmount.svelte';
  import ExpenseCardDateGroup from '$lib/components/Expense/ExpenseCardDateGroup';
  import ExportCsv from '$lib/components/Expense/ExportTrip/ExportCsv';
  import TotalExpense from '$lib/components/Expense/TotalExpense/TotalExpense.svelte';
  import Header from '$lib/components/Header.svelte';
  import TripStats from '$lib/components/Trip/TripStats/TripStats.svelte';
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

<svelte:head>
  <title>{useTripStore.data?.name || 'Triptop'}</title>
  <meta name="description" content="Triptop - Trip description" />
</svelte:head>

<div class="TripDetails">
  <Grid spacing={3}>
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
              <TripStats expenses={useExpensesStore.data} />
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
  }
</style>
