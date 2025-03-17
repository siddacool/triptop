<script lang="ts">
  import { page } from '$app/state';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripByIdStore } from '$lib/stores/trips/trip-by-id.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  const tripId = page.params.tripId;

  const mounted = $derived(
    useTripByIdStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted,
  );

  const fetching = $derived(
    useTripByIdStore.fetching && useBudgetStore.fetching && useExpenseStore.fetching,
  );

  $effect(() => {
    async function fetchData() {
      try {
        await useTripByIdStore.init(tripId);
        await useExpenseStore.init(tripId);
        await useBudgetStore.init(tripId);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  });
</script>

{#if fetching}
  <p>Loading...</p>
{:else if mounted}
  {#if children}
    {@render children()}
  {/if}
{:else}
  <span></span>
{/if}
