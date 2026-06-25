<script>
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
</script>

<h2>{useTripStore.trip?.name}</h2>

<style lang="scss">
  h2 {
    margin: 0;
    margin-left: 4px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
