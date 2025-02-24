<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import CreateButton from '$lib/components/Trips/Details/CreateButton.svelte';
  import Header from '$lib/components/Trips/Details/Header.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;

  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === tripId));

  $effect(() => {
    if (targetTrip) {
      useLocalSettingsStore.updateLastOpenTrip(targetTrip._id);
    }
  });

  beforeNavigate((val) => {
    if (val.to?.route?.id === '/') {
      useLocalSettingsStore.resetLastOpenTrip();
    }
  });
</script>

<title>{targetTrip?.name || ''}</title>

<Header />

<Stack space={4}>
  <CreateButton />
</Stack>

<style lang="scss">
</style>
