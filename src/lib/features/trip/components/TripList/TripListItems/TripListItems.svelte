<script lang="ts">
  import type { Trip } from '$lib/features/trip/types';
  import TripListItem from './TripListItem/TripListItem.svelte';

  type Props = {
    trips: Trip[];
  };

  let { trips }: Props = $props();
</script>

<ul class="TripListItems">
  {#each trips as trip (trip._id)}
    <TripListItem {trip} />
  {/each}
</ul>

<style lang="scss">
  .TripListItems {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
</style>
