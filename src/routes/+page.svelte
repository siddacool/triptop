<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';
  import { onMount } from 'svelte';

  let loading = $state(true);

  onMount(() => {
    const activeTrip = useTripActivePageStore.activeTrip;

    if (!activeTrip) {
      goto(resolve('/trips'));
      return;
    }
    goto(resolve(`/trips/${activeTrip}`));
  });
</script>

{#if loading}
  <Loading />
{/if}
