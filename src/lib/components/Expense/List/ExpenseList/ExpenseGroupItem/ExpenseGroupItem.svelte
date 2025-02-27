<script lang="ts">
  import type { ExpenseDateGroup } from '$lib/stores/expense/types';
  import ExpenseCard from './ExpenseCard.svelte';
  import GroupHeader from './GroupHeader/GroupHeader.svelte';

  interface Props {
    expenseGroup: ExpenseDateGroup;
  }

  const { expenseGroup }: Props = $props();
</script>

<div class="ExpenseGroupItem">
  <GroupHeader {expenseGroup} />
  <ul>
    {#each expenseGroup.expenses as expense}
      <ExpenseCard {expense} />
    {/each}
  </ul>
</div>

<style lang="scss">
  .ExpenseGroupItem {
    margin-bottom: 20px;

    ul {
      margin: 0;
      padding: 0;
    }
  }
</style>
