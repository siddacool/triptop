<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';

  let loading = $state(true);

  onMount(() => {
    const activeTrip = useTripActivePageStore.activeTrip;

    if (!activeTrip) {
      goto(resolve('/trips'));
      return;
    }

    const loadTrip = async () => {
      try {
        await useTripStore.fetch(activeTrip);

        goto(resolve(`/trips/${activeTrip}`));
        return;
      } catch (error) {
        console.error('Failed to fetch trip:', error);

        useTripActivePageStore.reset();

        goto(resolve('/trips'));
      }
    };

    loadTrip();
  });
</script>

{#if loading}
  <Loading />
{/if}
