<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { tripPageStore } from '$lib/features/trip/store/page.svelte';

  const activeTrip = $derived(tripPageStore.activeTrip);
  let loading = $state(true);

  const loadTrip = async () => {
    try {
      if (!activeTrip) {
        console.log('No activeTrip, redirecting to /trips');
        goto(resolve('/trips'), { replaceState: true });

        return;
      }

      await tripDetailStore.load(activeTrip);

      const trip = tripDetailStore.trip;

      if (!trip?._id) {
        throw new Error(`${activeTrip} does not exits.`);
      }

      goto(resolve(`/trips/${activeTrip}`), { replaceState: true });

      console.log(`Redirecting to ${trip.name} [${activeTrip}]`);
    } catch (e) {
      console.error(e);

      goto(resolve('/trips'), { replaceState: true });
    } finally {
      loading = false;
    }
  };

  $effect(() => {
    loadTrip();
  });
</script>

<LoadingBoundary {loading}></LoadingBoundary>
