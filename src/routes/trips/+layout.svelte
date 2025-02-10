<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Icon from '@iconify/svelte';

  const { children }: SvelteComponentProps = $props();

  const id = page.params.id;
  const targetTrip = $derived(useTripsStore.data.find((item) => item._id === id));

  console.log(page);

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

<div>
  {#if page.route.id !== '/trips/[id]'}
    <header>
      <a href={`/trips/${targetTrip?._id}/`}><Icon icon="lets-icons:back" /> {targetTrip?.name}</a>
    </header>
  {/if}

  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  header {
    margin: 16px 0;
  }
  a {
    cursor: pointer;
    color: var(--color-primary-800);
    font-weight: 600;
    display: inline-block;
  }
</style>
