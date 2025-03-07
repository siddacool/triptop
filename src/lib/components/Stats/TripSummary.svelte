<script lang="ts">
  import { page } from '$app/state';
  import AmountDisplay from '$lib/components/ui-framework/FormattedInfo/AmountDisplay.svelte';
  import Chip from '$lib/components/ui-framework/FormattedInfo/Chip.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { getCurrencyWiseExpense, getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import {
    getExpenseForDateRange,
    useStatisticsStore,
  } from '$lib/stores/statistics/statistics.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;
  const expenses = $derived(
    getExpenseForDateRange(tripId, useStatisticsStore.startDate, useStatisticsStore.endDate),
  );
  const expenseCurrencyWise = $derived(getCurrencyWiseExpense(expenses));

  const expenseGroups = $derived(
    getExpenseDateGroups(tripId)
      .map((item) => item.date)
      .reverse(),
  );

  const tripStartDate = $derived(
    useTripsStore.data.find((item) => item._id === tripId)?.startDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.startDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );

  const tripEndDate = $derived(
    useTripsStore.data.find((item) => item._id === tripId)?.endDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.endDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );

  const startDate = $derived(expenseGroups[0] ? expenseGroups[0] : tripStartDate);
  const endDate = $derived(
    expenseGroups[expenseGroups.length - 1] ? expenseGroups[expenseGroups.length - 1] : tripEndDate,
  );

  const statsStartDate = $derived(
    useStatisticsStore.startDate
      ? getMoment(useStatisticsStore.startDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : '',
  );

  const statsEndDate = $derived(
    useStatisticsStore.endDate
      ? getMoment(useStatisticsStore.endDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : '',
  );

  const isFullRange = $derived(statsStartDate === startDate && statsEndDate === endDate);
</script>

<StackItem>
  <Card>
    <h3>
      <div class="date-range">
        {#if useStatisticsStore.endDate}
          {getMoment(useStatisticsStore.startDate).format('MMM D')} - {getMoment(
            useStatisticsStore.endDate,
          ).format('MMM D, YYYY')}
        {:else}
          {getMoment(useStatisticsStore.startDate).format('MMM D, YYYY')}
        {/if}
      </div>

      {#if isFullRange}
        <Chip size="small">Entire trip</Chip>
      {/if}
    </h3>
    <h4>Total Expense</h4>
    {#if expenseCurrencyWise.length}
      <ul class="total">
        {#each expenseCurrencyWise as item (item.currency)}
          <li><AmountDisplay value={item.total} currency={item.currency} /></li>
        {/each}
      </ul>
    {/if}
  </Card>
</StackItem>

<style lang="scss">
  .total {
    margin: 0;
    margin-bottom: 8px;
    margin-top: 6px;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
    }
  }

  h3 {
    margin: 0;
    margin-bottom: 16px;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: left;
    letter-spacing: 0.3px;
    color: var(--color-grey-font-700);
    min-height: 20px;
    display: flex;
    align-items: center;

    :global(.Chip) {
      font-size: 0.9rem;
      height: 20px;
      margin-left: 5px;
    }
  }

  h4 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0.3px;
    color: var(--color-grey-font-700);
  }
</style>
