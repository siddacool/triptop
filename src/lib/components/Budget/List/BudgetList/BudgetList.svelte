<script lang="ts">
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import Budgettem from './Budgettem.svelte';
</script>

<StackItem>
  <ul>
    {#each useBudgetStore.data as budget (budget._id)}
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
