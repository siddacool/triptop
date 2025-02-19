<script lang="ts">
  import { goto } from '$app/navigation';
  import DecoratedCard from '$lib/components/DecoratedCard.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { Trip } from '$lib/stores/trips/types';

  type Props = {
    trip: Trip;
  };

  const { trip }: Props = $props();

  $effect(() => {
    const isTrip = useTripsStore.data.some(
      (item) => item._id === useLocalSettingsStore.lastOpenTrip,
    );

    if (isTrip) {
      goto(`/trips/${useLocalSettingsStore.lastOpenTrip}`);
    }
  });
</script>

<DecoratedCard href={`/trips/${trip._id}`} active>
  {#snippet title()}
    {trip.name}
  {/snippet}
</DecoratedCard>
