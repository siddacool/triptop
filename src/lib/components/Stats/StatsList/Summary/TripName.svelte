<script>
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
</script>

<h2 class="TripName">{useTripStore.trip?.name}</h2>

<style lang="scss">
  .TripName {
    color: var(--dodo-color-neutral-700);
    font-variation-settings: 'wdth' 78;
  }
</style>
