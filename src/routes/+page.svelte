<script lang="ts">
  import { goto } from '$app/navigation';
  import { getTripById } from '$lib/api/trips';
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
        const lastOpenTrip = useLocalSettingsStore.lastOpenTrip;

        if (!lastOpenTrip) {
          await useTripsStore.init();
          return;
        }

        const targetTrip = await getTripById(lastOpenTrip);

        if (!targetTrip) {
          await useTripsStore.init();
          return;
        }

        goto(`/${useLocalSettingsStore.lastOpenTrip}`);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  });
</script>

<title>Triptop - Travel budgeting app</title>

{#if fetching}
  <p>Loading...</p>
{:else if mounted}
  <Header />
  <Stack space={4}>
    <CreateButton />
    <TripList />
    <ImportTrip />
  </Stack>
{:else}
  <span></span>
{/if}
