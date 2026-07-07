<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { useTripActivePageStore } from '$lib/stores/app/pages/trip-active-page.svelte';

  const pageName = $derived(page.url.searchParams.get('pageName'));
  const activeTrip = $derived(useTripActivePageStore.activeTrip);

  $effect(() => {
    if (pageName === 'add-expense' && activeTrip) {
      goto(resolve(`/trips/${activeTrip}/expenses/add`), { replaceState: true });
    } else {
      goto(resolve('/trips'), { replaceState: true });
    }
  });
</script>

<h1>Redirecting...</h1>
