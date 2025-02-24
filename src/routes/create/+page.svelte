<script lang="ts">
  import { goto } from '$app/navigation';
  import TripEditForm from '$lib/components/Trips/Edit/TripEditForm';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
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

<Stack space={4}>
  <StackItem>
    <h2>Create a new trip</h2>
  </StackItem>
  <TripEditForm {onSave} />
</Stack>

<style lang="scss">
  h2 {
    margin: 0;
    font-weight: 500;
  }
</style>
