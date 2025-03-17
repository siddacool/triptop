<script lang="ts">
  import { goto } from '$app/navigation';
  import CreateButton from '$lib/components/Trips/List/CreateButton.svelte';
  import Header from '$lib/components/Trips/List/Header.svelte';
  import ImportTrip from '$lib/components/Trips/List/ImportTrip.svelte';
  import TripList from '$lib/components/Trips/List/TripList';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(useTripsStore.mounted);

  const fetching = $derived(useTripsStore.fetching);

  $effect(() => {
    async function fetchData() {
      try {
        await useTripsStore.init();
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  });

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

{#if fetching}
  <p>Loading...</p>
{:else if mounted}
  <Stack space={4}>
    <CreateButton />
    <TripList />
    <ImportTrip />
  </Stack>
{:else}
  <span></span>
{/if}
