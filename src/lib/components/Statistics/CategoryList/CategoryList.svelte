<script lang="ts">
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import CategoryListItem from './CategoryListItem.svelte';
</script>

<h2>Category</h2>

<table>
  {#each categoryOptions as category}
    <CategoryListItem {category} />
  {/each}
</table>

<style lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0;
  }
</style>
