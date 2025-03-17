<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import TripEditForm from '$lib/components/Trips/Edit/TripEditForm';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { TripFormData } from '$lib/stores/trips/types';

  const tripId = page.params.tripId;
  const name = $derived(useTripByIdStore.data?.name || '');

  async function onSave(data: TripFormData) {
    try {
      await useTripsStore.update(tripId, data);

      goto(`/${tripId}`);
    } catch (e) {
      console.log(e);
    }
  }

  async function onDelete() {
    try {
      await useLocalSettingsStore.resetLastOpenTrip();
      await useLocalSettingsStore.updateLastBudget(undefined);
      goto('/');
      await useTripsStore.delete(tripId);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Edit: {name}</title>

<PageHeader title={`Edit: ${name}`} backTo={`/${tripId}`} />

<Stack space={4}>
  <TripEditForm {onSave} />
  <StackItem>
    <Button variant="danger" onclick={onDelete}>Delete trip</Button>
  </StackItem>
</Stack>
