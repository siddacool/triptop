<script lang="ts">
  import { page } from '$app/state';
  import EditBudget from '$lib/components/Budget/Edit/EditBudget/EditBudget.svelte';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import { useTripsStore } from '$lib/stores/trips/trips.svelte';

  const mounted = $derived(
    useTripsStore.mounted && useBudgetStore.mounted && useExpenseStore.mounted ? true : false,
  );

  const id = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === id));
</script>

{#if mounted && targetBudget}
  <Stack space={3}>
    <StackItem>
      <H2>Edit budget</H2>
    </StackItem>
    <EditBudget budgetId={id} />
  </Stack>
{/if}
