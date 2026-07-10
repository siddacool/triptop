<script lang="ts">
  import { page } from '$app/state';
  import LoadingBoundary from '$lib/components/LoadingBoundary.svelte';
  import RedirectHomePage from '$lib/components/ui/RedirectHomePage/RedirectHomePage.svelte';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import { onMount } from 'svelte';

  let { children } = $props();

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
  let pass = $state(false);
  let loading = $state(true);

  onMount(() => {
    if (!expenseId) {
      loading = false;
      return;
    }

    const loadTrip = async () => {
      try {
        await expenseDeatilStore.load(expenseId);

        pass = true;
      } catch (error) {
        console.error('Failed to fetch expsense:', error);
      } finally {
        loading = false;
      }
    };

    loadTrip();
  });
</script>

<LoadingBoundary {loading}>
  {#if pass}
    {@render children()}
  {:else}
    <RedirectHomePage backTo={`/trips/${tripId}`}>Expense does not exists</RedirectHomePage>
  {/if}
</LoadingBoundary>
