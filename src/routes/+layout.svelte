<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import GlobalContainer from '$lib/components/GlobalContainer';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  $effect(() => {
    async function fetchData() {
      try {
        await useTripsStore.init();
        await useBudgetStore.init();
        await useExpenseStore.init();
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  });
</script>

<GlobalContainer />

<main>
  <Box>
    <div>
      {#if children}
        {@render children()}
      {/if}
    </div>
  </Box>
</main>

<style lang="scss">
  main {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
