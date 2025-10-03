<script lang="ts">
  import { page } from '$app/state';
  import ExpenseDetails from '$lib/components/Expense/ExpenseDetails';
  import Header from '$lib/components/Header.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  const expenseId = page.params.expenseId;
  const tripId = page.params.tripId;

  onMount(async () => {
    if (!expenseId) {
      return;
    }
    await useExpenseStore.fetch(expenseId);
  });

  onMount(() => {
    return () => {
      useExpenseStore.reset();
    };
  });
</script>

<svelte:head>
  <title>Expense details</title>
  <meta name="description" content="Triptop - Expense details" />
</svelte:head>

<div class="ExpenseDetails">
  <Header backTo={`/${tripId}`} aria-label="Back to trip">
    Expense Details
    {#snippet after()}
      <Button
        href={`/${tripId}/${expenseId}/edit`}
        aria-label="Edit Expense"
        compact
        class="EditExpense"
      >
        <Icon icon="material-symbols:edit" />
      </Button>
    {/snippet}
  </Header>

  {#if useExpenseStore.data}
    <ExpenseDetails data={useExpenseStore.data} />
  {/if}
</div>
