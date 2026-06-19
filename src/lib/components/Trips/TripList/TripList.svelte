<script>
  import { useTripListStore } from '$lib/stores/trip/list.svelte';
  import Controls from './Controls/Controls.svelte';
  import TripListItems from './TripListItems/TripListItems.svelte';
</script>

<div class="TripList">
  <TripListItems trips={useTripListStore.tripsActive} />
  <Controls />
</div>

<style lang="scss">
  .TripList {
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
