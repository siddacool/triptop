<script lang="ts">
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import StackItem from '../../ui-framework/Layout/Stack/StackItem.svelte';
  import { getExpenseDateGroups } from '$lib/stores/expense/expense.svelte';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import Button from '../../ui-framework/Form/Button.svelte';

  const expenseGroups = $derived(
    getExpenseDateGroups()
      .map((item) => item.date)
      .reverse(),
  );

  const tripStartDate = $derived(
    useTripByIdStore.data?.startDate
      ? getMoment(useTripByIdStore.data?.startDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : undefined,
  );

  const tripEndDate = $derived(
    useTripByIdStore.data?.endDate
      ? getMoment(useTripByIdStore.data?.endDate).format(DateFormats.YEAR_FIRST_STANDARD)
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
