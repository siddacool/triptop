<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { tripPageStore } from '$lib/features/trip/store/page.svelte';

  const activeTrip = $derived(tripPageStore.activeTrip);

  $effect(() => {
    if (activeTrip) {
      goto(resolve(`/trips/${activeTrip}`), { replaceState: true });
    } else {
      goto(resolve('/trips'), { replaceState: true });
    }
  });
</script>
