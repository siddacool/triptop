<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { tripPageStore } from '$lib/features/trip/store/page.svelte';

  const pageName = $derived(page.url.searchParams.get('pageName'));
  const activeTrip = $derived(tripPageStore.activeTrip);

  $effect(() => {
    if (pageName === 'add-expense' && activeTrip) {
      goto(resolve(`/trips/${activeTrip}/expenses/add`), { replaceState: true });
    } else {
      goto(resolve('/trips'), { replaceState: true });
    }
  });
</script>

<h1>Redirecting...</h1>
