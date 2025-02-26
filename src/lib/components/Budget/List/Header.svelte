<script lang="ts">
  import { page } from '$app/state';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const tripId = page.params.tripId;

  const name = $derived(useTripsStore.data.find((item) => item._id === tripId)?.name || '');
</script>

<header>
  <h2>Budget: {name}</h2>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    margin: 0;
    font-weight: 500;
  }
</style>
