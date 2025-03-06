<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
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
          'YYYY-MM-DD',
        )
      : undefined,
  );

  const tripEndDate = $derived(
    useTripsStore.data.find((item) => item._id === tripId)?.endDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.endDate).format(
          'YYYY-MM-DD',
        )
      : undefined,
  );

  const startDate = $derived(expenseGroups[0] ? expenseGroups[0] : tripStartDate);
  const endDate = $derived(
    expenseGroups[expenseGroups.length - 1] ? expenseGroups[expenseGroups.length - 1] : tripEndDate,
  );

  function onclick() {
    useStatisticsStore.updateStartDate(getMoment(startDate, 'YYYY-MM-DD').valueOf());
    useStatisticsStore.updateEndDate(getMoment(endDate, 'YYYY-MM-DD').valueOf());
  }
</script>

<StackItem>
  <Button name="reset-dates" {onclick}>Reset dates</Button>
</StackItem>
