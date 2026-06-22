<script>
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
</script>

<div class="ExpenseName">
  {#if useExpenseStore.expense?.name}
    {useExpenseStore.expense.name}
  {:else}
    ''
  {/if}
</div>

<style lang="scss">
  .ExpenseName {
    margin: 0 var(--dodo-ui-space);
    font-size: 1.1rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 600px) {
      font-size: 1.2rem;
    }
  }
</style>
