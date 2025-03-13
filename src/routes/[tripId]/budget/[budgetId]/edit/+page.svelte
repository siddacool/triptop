<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import BudgetEditForm from '$lib/components/Budget/Edit/BudgetEditForm/BudgetEditForm.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Stack from '$lib/components/ui-framework/Layout/Stack/Stack.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import type { BudgetFormData } from '$lib/stores/budget/types';

  const tripId = page.params.tripId;
  const budgetId = page.params.budgetId;
  const name = $derived(useBudgetStore.data.find((item) => item._id === budgetId)?.name || '');

  async function onSave(data: BudgetFormData) {
    try {
      await useBudgetStore.update(budgetId, data);

      goto(`/${tripId}/budget`);
    } catch (e) {
      console.log(e);
    }
  }

  async function onDelete() {
    try {
      await useBudgetStore.delete(budgetId);

      goto(`/${tripId}/budget`);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<title>Edit budget: {name}</title>

<PageHeader title={`Edit budget: ${name}`} backTo={`/${tripId}/budget/${budgetId}`} />

<Stack space={4}>
  <BudgetEditForm {onSave} {budgetId} />
  <StackItem>
    <Button variant="danger" onclick={onDelete}>Delete budget</Button>
  </StackItem>
</Stack>
