<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { tripPageStore } from '$lib/features/trip/store/page.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';

  const pageName = $derived(page.url.searchParams.get('pageName'));
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

      let pathToRedirect = `/trips/${activeTrip}`;

      if (pageName === 'add-expense') {
        pathToRedirect = `/trips/${activeTrip}/expenses/add`;
      } else if (pageName === 'currency-converter') {
        pathToRedirect = `/trips/${activeTrip}/currency-converter`;
      }

      goto(resolve(`${pathToRedirect}` as '/trips/'), { replaceState: true });

      console.log(`Redirecting to ${trip.name} [${pathToRedirect}]`);
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
