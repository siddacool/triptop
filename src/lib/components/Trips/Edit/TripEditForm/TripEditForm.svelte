<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { TripFormData } from '$lib/stores/trips/types';

  interface Props {
    tripId?: string;
    onSave: (data: TripFormData) => Promise<void>;
  }

  const { tripId, onSave }: Props = $props();

  let name = $state(useTripsStore.data.find((item) => item._id === tripId)?.name || '');
  let startDate: string | undefined = $state(
    useTripsStore.data.find((item) => item._id === tripId)?.startDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.startDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );
  let endDate: string | undefined = $state(
    useTripsStore.data.find((item) => item._id === tripId)?.endDate
      ? getMoment(useTripsStore.data.find((item) => item._id === tripId)?.endDate).format(
          DateFormats.YEAR_FIRST_STANDARD,
        )
      : undefined,
  );

  let loading = $state(false);
  const disabled = $derived(!name || !startDate || !endDate || loading);

  function oninput(e: Event) {
    const element = e.target as HTMLInputElement;

    switch (element.name) {
      case 'name':
        name = element.value;
        break;
      case 'startDate':
        startDate = element.value;
        endDate = undefined;
        break;
      case 'endDate':
        endDate = element.value;
        break;
      default:
        break;
    }
  }

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (disabled) {
        return;
      }

      loading = true;

      const startDateFormatted = getMoment(startDate).toDate();
      const endDateFormatted = getMoment(endDate).toDate();

      await onSave({
        name,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  }
</script>

<StackItem>
  <form {onsubmit}>
    <Stack space={2}>
      <StackItem>
        <TextInput
          value={name}
          {oninput}
          name="name"
          label="Enter trip name"
          placeholder="Japan trip"
        />
      </StackItem>
      <StackItem>
        <DateInput value={startDate} {oninput} name="startDate" label="Select start date" />
      </StackItem>
      <StackItem>
        <DateInput
          value={endDate}
          {oninput}
          name="endDate"
          label="Select end date"
          min={startDate}
        />
      </StackItem>
      <StackItem></StackItem>
      <StackItem>
        <Button type="submit" variant="safe" {disabled}>Save</Button>
      </StackItem>
    </Stack>
  </form>
</StackItem>

<style>
</style>
