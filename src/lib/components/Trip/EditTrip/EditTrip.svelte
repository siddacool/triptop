<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment, newDateStringToYearMonthDay } from '$lib/helpers/time';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  interface Props {
    tripId?: string;
  }

  const { tripId }: Props = $props();

  let name = $state(useTripsStore.data.find((item) => item._id === tripId)?.name || '');
  let startDate: Date | null = $state(
    useTripsStore.data.find((item) => item._id === tripId)?.startDate || null,
  );
  let endDate: Date | null = $state(
    useTripsStore.data.find((item) => item._id === tripId)?.endDate || null,
  );

  const startDateString = $derived(newDateStringToYearMonthDay(startDate));
  const endDateString = $derived(newDateStringToYearMonthDay(endDate));

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        name = target.value;
        break;
      case 'startDate':
        startDate = target.valueAsDate;

        const startDateMoment = getMoment(target.valueAsDate);
        const endDateMoment = endDate ? getMoment(endDate) : null;

        if (endDateMoment && startDateMoment.isAfter(endDateMoment)) {
          endDate = null;
        }

        break;
      case 'endDate':
        endDate = target.valueAsDate;
        break;
      default:
        break;
    }
  }

  function onsubmit(e: Event) {
    e.preventDefault();

    if (!name.trim() || !startDate || !endDate) {
      return;
    }

    if (tripId) {
      useTripsStore.update(tripId, name, startDate, endDate);
    } else {
      useTripsStore.add(name, startDate, endDate);
    }

    goto('/');
  }
</script>

<form {onsubmit}>
  <Stack space={2}>
    <StackItem>
      <TextInput
        label="Trip Name"
        value={name}
        {oninput}
        name="name"
        placeholder="Name your trip"
      />
    </StackItem>
    <StackItem>
      <DateInput label="Start date" value={startDateString} {oninput} name="startDate" />
    </StackItem>
    <StackItem>
      <DateInput
        label="End date"
        value={endDateString}
        {oninput}
        min={startDateString}
        name="endDate"
      />
    </StackItem>
    <StackItem>
      <Button type="submit" disabled={!name.trim() || !startDate || !endDate}>Save</Button>
    </StackItem>
  </Stack>
</form>

<style lang="scss">
</style>
