<script lang="ts">
  import { page } from '$app/state';
  import ItemList from '$lib/components/ItemList.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import BudgetListItem from './BudgetListItem.svelte';

  const tripId = page.params.id;
  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === tripId));
</script>

<StackItem>
  <ItemList>
    {#each budgets as budget}
      <BudgetListItem {budget} />
    {/each}
  </ItemList>
</StackItem>
