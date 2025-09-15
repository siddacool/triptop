<script lang="ts">
  import { page } from '$app/state';
  import ExpenseDetails from '$lib/components/Expense/ExpenseDetails';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { onMount } from 'svelte';

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

{#if useExpenseStore.data}
  <ExpenseDetails data={useExpenseStore.data} />
{/if}
