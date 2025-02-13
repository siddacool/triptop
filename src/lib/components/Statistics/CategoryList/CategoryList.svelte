<script lang="ts">
  import { page } from '$app/state';
  import { categoryOptions, useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import CategoryListItem from './CategoryListItem.svelte';

  const tripId = page.params.id;

  // Total expense
  const expenses = $derived(useExpenseStore.data.filter((item) => item.tripId === tripId));

  const totalExpenses = $derived(
    expenses.map((item) => item.amount || 0).reduce((partialSum, a) => partialSum + a, 0),
  );
</script>

<tr class="header">
  <td colspan="3"> Category </td>
</tr>
{#each categoryOptions as category}
  <CategoryListItem {category} {totalExpenses} />
{/each}

<style lang="scss">
  tr {
    &:hover {
      background-color: transparent;
    }
  }

  td {
    font-weight: 600;
    font-size: 1.2rem;
  }
</style>
