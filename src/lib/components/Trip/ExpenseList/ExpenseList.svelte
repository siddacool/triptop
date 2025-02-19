<script lang="ts">
  import { page } from '$app/state';
  import ItemList from '$lib/components/ItemList.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useExpenseStore } from '$lib/stores/expense/expense.svelte';
  import type { Expense } from '$lib/stores/expense/types';
  import type { DateGroup } from './ExpenseListItem.svelte';
  import ExpenseListItem from './ExpenseListItem.svelte';

  const groupExpensesByDateArray = (expenses: Expense[]) => {
    const grouped = expenses.reduce(
      (acc, expense) => {
        const formattedDate = getMoment(expense.date).format('YYYY-MM-DD'); // Format: DD/MM/YYYY

        if (!acc[formattedDate]) {
          acc[formattedDate] = {
            date: formattedDate,
            dateObject: getMoment(expense.date),
            expenses: [],
          };
        }

        acc[formattedDate].expenses.push(expense);
        return acc;
      },
      {} as Record<string, DateGroup>,
    );

    return Object.values(grouped); // Convert object to array
  };

  const id = page.params.id;
  const targetExpense = $derived(useExpenseStore.data.filter((item) => item.tripId === id));
  const targetExpenseDateGroup = $derived(groupExpensesByDateArray(targetExpense));
</script>

<StackItem>
  <ItemList>
    {#each targetExpenseDateGroup as dateGroup}
      <ExpenseListItem {dateGroup} />
    {/each}
  </ItemList>
</StackItem>
