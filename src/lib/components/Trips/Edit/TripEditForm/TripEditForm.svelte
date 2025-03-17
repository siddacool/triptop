<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { DateFormats, getMoment } from '$lib/helpers/time';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import type { TripFormData } from '$lib/stores/trips/types';

  interface Props {
    onSave: (data: TripFormData) => Promise<void>;
  }

  const { onSave }: Props = $props();

  let name = $state(useTripByIdStore.data?.name || '');
  let startDate: string | undefined = $state(
    useTripByIdStore.data?.startDate
      ? getMoment(useTripByIdStore.data?.startDate).format(DateFormats.YEAR_FIRST_STANDARD)
      : undefined,
  );
  let endDate: string | undefined = $state(
    useTripByIdStore.data?.endDate
      ? getMoment(useTripByIdStore.data?.endDate).format(DateFormats.YEAR_FIRST_STANDARD)
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
