<script lang="ts">
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import StackItem from '../../ui-framework/Layout/Stack/StackItem.svelte';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import { page } from '$app/state';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import Button from '../../ui-framework/Form/Button.svelte';

  const tripId = page.params.tripId;

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

  function onclick() {
    useStatisticsStore.updateStartDate(
      getMoment(startDate, DateFormats.YEAR_FIRST_STANDARD).valueOf(),
    );

    useStatisticsStore.updateEndDate(getMoment(endDate, DateFormats.YEAR_FIRST_STANDARD).valueOf());
  }

  const isFullRange = $derived(statsStartDate === startDate && statsEndDate === endDate);
</script>

<StackItem>
  <Button name="reset-dates" {onclick} disabled={isFullRange}>Reset dates</Button>
</StackItem>
