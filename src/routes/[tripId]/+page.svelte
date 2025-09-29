<script lang="ts">
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Icon from '@iconify/svelte';
  import ExpensesDateGroup from '$lib/components/Expense/ExpensesDateGroup';
  import { useExpensesStore } from '$lib/stores/expense/list.svelte';
  import { onMount } from 'svelte';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';

  const tripId = page.params.tripId;

  onMount(async () => {
    if (!tripId) {
      return;
    }

    await useTripStore.fetch(tripId);
    await useExpensesStore.fetch(tripId);
  });

  onMount(() => {
    return () => {
      useTripStore.reset();
      useExpensesStore.reset();
      useExpenseFiltersStore.reset();
    };
  });
</script>

<svelte:head>
  <title>{useTripStore.data?.name || 'Triptop'}</title>
  <meta name="description" content="Triptop - Trip description" />
</svelte:head>

<div class="TripDetails">
  <Header backTo="/" aria-label="Back to trips">
    {useTripStore.data?.name}
    {#snippet after()}
      <Button href={`/${tripId}/edit`} aria-label="Edit trip" compact class="EditTrip">
        <Icon icon="material-symbols:edit" />
      </Button>
    {/snippet}
  </Header>

  <ExpensesDateGroup />
</div>
