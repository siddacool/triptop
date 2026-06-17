<script>
  import ExpenseDateGroup from '$lib/components/Expenses/ExpenseDateGroup/ExpenseDateGroup.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';

  $effect(() => {
    console.log('debug:', useExpenseListStore.groupExpenses);
  });
</script>

<ul class="ExpensList">
  {#each useExpenseListStore.groupExpenses as group (group.date)}
    <ExpenseDateGroup data={group} />
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
