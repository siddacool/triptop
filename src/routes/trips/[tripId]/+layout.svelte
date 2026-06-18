<script lang="ts">
  import { page } from '$app/state';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;

  onMount(() => {
    if (!tripId) {
      return;
    }

    useTripStore.fetch(tripId);
  });
</script>

{@render children()}
