<script lang="ts">
  import { page } from '$app/state';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));

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

  console.log(page);
</script>

<div class="tripLayout">
  <div>
    {#if children}
      {@render children()}
    {/if}
  </div>

  {#if page.route.id !== '/trips/[id]'}
    <footer>
      <a href={`/trips/${targetTrip?._id}/`}>{targetTrip?.name}</a>
    </footer>
  {/if}
</div>

<style lang="scss">
  .tripLayout {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  footer {
    margin: 0;
    margin-top: 16px;
  }

  a {
    cursor: pointer;
    color: var(--color-primary-800);
    font-weight: 600;
    display: inline-block;
  }
</style>
