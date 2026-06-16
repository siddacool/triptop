<script>
  import { useTripsStore } from '$lib/stores/trip/trips.svelte';
  import Controls from './Controls/Controls.svelte';
  import TripListItems from './TripListItems/TripListItems.svelte';
</script>

<div class="TripList">
  <TripListItems trips={useTripsStore.tripsActive} />
  <Controls />
</div>

<style lang="scss">
</style>
