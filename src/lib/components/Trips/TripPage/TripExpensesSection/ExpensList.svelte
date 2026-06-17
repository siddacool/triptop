<script>
  import ExpenseCard from '$lib/components/Expenses/ExpenseCard/ExpenseCard.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
</script>

<ul class="ExpensList">
  {#each useExpenseListStore.expenses as expense (expense._id)}
    <ExpenseCard {expense} />
  {/each}
</ul>

<style lang="scss">
  .ExpensList {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    @media (min-width: 600px) {
      margin-top: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
