<script>
  import { useAllExpenseListStore } from '$lib/stores/expense/all.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import { createDate } from '@flightlesslabs/time-utils';
</script>

<div></div>

<svelte:head>
  <title>debug:expenses</title>
</svelte:head>

<h2>Expense list</h2>

<div>
  {#each useAllExpenseListStore.expenses as expense (expense._id)}
    <Card outline class="ExpenseCard" shadow={0}>
      <h4>{expense.name}</h4>
      <p>Amount: {expense.amount}</p>
      <p>Payment Mode: {expense.paymentMode}</p>
      <p>Category: {expense.category}</p>
      <p>tripId: {expense.tripId}</p>
      <p>Created at: {createDate(expense.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
      <p>Updated at: {createDate(expense.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</p>
    </Card>
  {/each}
</div>

<style lang="scss">
  h4,
  p {
    margin-top: 0;
    margin-bottom: 6px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  div {
    :global(.ExpenseCard) {
      padding: var(--dodo-ui-space);
      margin-bottom: var(--dodo-ui-space);
    }
  }
</style>
