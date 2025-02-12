<script lang="ts">
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import StatItem from './StatItem.svelte';
</script>

<table>
  {#each categoryOptions as category}
    <StatItem {category} />
  {/each}
</table>

<style lang="scss">
  table {
    margin-top: 32px;
    width: 100%;
    border-collapse: collapse;
  }
</style>
