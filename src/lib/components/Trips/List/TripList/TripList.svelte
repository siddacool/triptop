<script lang="ts">
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import ListItem from './ListItem.svelte';

  const trips = $derived(useTripsStore.data);
</script>

<StackItem>
  <ul class="TripList">
    {#each trips as trip (trip._id)}
      <ListItem {trip} />
    {/each}
  </ul>
</StackItem>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
</style>
