<script>
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
</script>

<div class="TripName">
  {#if useTripStore.trip?.name}
    {useTripStore.trip.name}
  {:else}
    ''
  {/if}
</div>

<style lang="scss">
  .TripName {
    margin: 0 var(--dodo-ui-space);
    font-size: 1.1rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 600px) {
      font-size: 1.2rem;
    }
  }
</style>
