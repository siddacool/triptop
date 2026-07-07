<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';

  const activeTrip = $derived(useTripActivePageStore.activeTrip);

  $effect(() => {
    if (activeTrip) {
      goto(resolve(`/trips/${activeTrip}`), { replaceState: true });
    } else {
      goto(resolve('/trips'), { replaceState: true });
    }
  });
</script>
