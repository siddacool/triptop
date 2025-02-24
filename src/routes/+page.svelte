<script lang="ts">
  import { goto } from '$app/navigation';
  import CreateButton from '$lib/components/Trips/List/CreateButton.svelte';
  import Header from '$lib/components/Trips/List/Header.svelte';
  import TripList from '$lib/components/Trips/List/TripList';
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

<Header />

<Stack space={4}>
  <CreateButton />
  <TripList />
</Stack>
