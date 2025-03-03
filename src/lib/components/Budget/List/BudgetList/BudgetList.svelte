<script lang="ts">
  import { page } from '$app/state';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import Budgettem from './Budgettem.svelte';

  const tripId = page.params.tripId;
  const targetBudgets = $derived(useBudgetStore.data.filter((item) => item.tripId === tripId));
</script>

<StackItem>
  <ul>
    {#each targetBudgets as budget (budget._id)}
      <Budgettem {budget} />
    {/each}
  </ul>
</StackItem>

<style lang="scss">
  ul {
    padding: 0;
    margin: 0;
  }
</style>
