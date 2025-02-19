<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import H2 from '$lib/components/ui-framework/Headings/H2.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.id;
  const id = page.params.budgetId;
  const targetBudget = $derived(useBudgetStore.data.find((item) => item._id === id));
</script>

<StackItem>
  <header>
    <H2>
      {targetBudget?.name}
    </H2>

    <AnchorButton href={`/${tripId}/budget/${id}/edit`} variant="primary" compact>
      <Icon icon="material-symbols:edit" />
    </AnchorButton>
  </header>
</StackItem>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
