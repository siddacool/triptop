<script lang="ts">
  import type { Trip } from '$lib/features/trip/types';
  import TripListItems from './TripListItems/TripListItems.svelte';

  type Props = {
    trips: Trip[];
  };

  let { trips }: Props = $props();
</script>

<div class="TripList">
  <TripListItems {trips} />
</div>

<style lang="scss">
  .TripList {
    margin-top: calc(var(--dodo-ui-space) * 1);

    @media (min-width: 600px) {
      margin-top: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
