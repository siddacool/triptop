<script lang="ts">
  import { page } from '$app/state';
  import { useBudgetStore } from '$lib/stores/budget/budget.svelte';
  import BudgetListItem from './BudgetListItem.svelte';

  const tripId = page.params.id;
  const budgets = $derived(useBudgetStore.data.filter((item) => item.tripId === tripId));
</script>

<div class="BudgetList">
  <h2>Budget</h2>
  <ul>
    {#each budgets as budget}
      <BudgetListItem {budget} />
    {/each}
  </ul>
</div>

<style lang="scss">
  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .BudgetList {
    margin-top: 16px;
    ul {
      display: block;
      margin: 0;
      padding: 0;
    }
  }
</style>
