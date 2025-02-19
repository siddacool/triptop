<script lang="ts">
  import { goto } from '$app/navigation';
  import CreateTripButton from '$lib/components/Trip/CreateTripButton.svelte';
  import TripHeader from '$lib/components/Trip/TripHeader.svelte';
  import TripList from '$lib/components/Trip/TripList/TripList.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  $effect(() => {
    const isTrip = useTripsStore.data.some(
      (item) => item._id === useLocalSettingsStore.lastOpenTrip,
    );

    if (isTrip) {
      goto(`/${useLocalSettingsStore.lastOpenTrip}`);
    }
  });
</script>

<title>Triptop - Travel budgeting app</title>

<Stack space={4}>
  <TripHeader />
  <TripList />
  <CreateTripButton />
</Stack>
