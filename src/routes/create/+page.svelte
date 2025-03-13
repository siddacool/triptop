<script lang="ts">
  import { goto } from '$app/navigation';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import TripEditForm from '$lib/components/Trips/Edit/TripEditForm';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { TripFormData } from '$lib/stores/trips/types';

  async function onSave(data: TripFormData) {
    try {
      await useTripsStore.add(data);

      goto('/');
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Create a new trip</title>
<meta name="description" content="Create a new trip using the following form" />

<PageHeader title="Create a new trip" backTo="/" />

<Stack space={4}>
  <TripEditForm {onSave} />
</Stack>
