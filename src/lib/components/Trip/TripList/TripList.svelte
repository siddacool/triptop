<script lang="ts">
  import { goto } from '$app/navigation';
  import ItemList from '$lib/components/ItemList.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useLocalSettingsStore } from '$lib/stores/local-settings/local-settings.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import StyledCard from './StyledCard.svelte';

  const mounted = $derived(useTripsStore.mounted ? true : false);

  $effect(() => {
    const isTrip = useTripsStore.data.some(
      (item) => item._id === useLocalSettingsStore.lastOpenTrip,
    );

    if (isTrip) {
      goto(`/trips/${useLocalSettingsStore.lastOpenTrip}`);
    }
  });
</script>

{#if mounted && useTripsStore.data.length}
  <StackItem>
    <ItemList>
      {#each useTripsStore.data as trip}
        <StyledCard {trip} />
      {/each}
    </ItemList>
  </StackItem>
{/if}
