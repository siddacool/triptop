<script lang="ts">
  import { page } from '$app/state';
  import Header from '$lib/components/Header.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Loader from '$lib/ui-lib/Loader';
  import { Column, Grid } from '@flightlesslabs/grid';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

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

<div class="ExpenseDetails">
  <Grid spacing={4}>
    <Column>
      <Header backTo={`/${tripId}`} aria-label="Back to trip">
        {useExpenseStore.data?.name}
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
    </Column>
    {#if useExpenseStore.fetching}
      <Column>
        <Loader />
      </Column>
    {:else if useExpenseStore.data?._id}
      {useExpenseStore.data?._id}
    {/if}
  </Grid>
</div>
