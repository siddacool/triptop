<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    const activeTrip = useTripActivePageStore.activeTrip;

    if (activeTrip) {
      goto(resolve(`/trips/${activeTrip}`));
      return;
    }

    goto(resolve('/trips'));
  });
</script>
