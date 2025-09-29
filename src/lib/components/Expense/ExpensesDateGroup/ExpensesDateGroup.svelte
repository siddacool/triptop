<script lang="ts">
  import SvelteVirtualList from '@humanspeak/svelte-virtual-list';
  import {
    getDateWiseExpenses,
    useExpensesStore,
    type DateWiseExpense,
  } from '$lib/stores/expense/list.svelte';
  import { Column } from '@flightlesslabs/grid';
  import DateDisplay from './DateDisplay.svelte';
  import ExpenseCard from '../ExpenseCard/ExpenseCard.svelte';
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import {
    getFilteredExpenses,
    useExpenseFiltersStore,
  } from '$lib/stores/expense/filters/index.svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import TripStats from '$lib/components/Trip/TripStats';
  import VirtualListItem from '$lib/ui-lib/VirtualList/VirtualListItem';
  import VirtualListHolder from '$lib/ui-lib/VirtualList/VirtualListHolder';
  import Filters from './Filters';

  const tripId = page.params.tripId;

  let filteredExpenses = $derived<Expense[]>(
    getFilteredExpenses(useExpensesStore.data || [], useExpenseFiltersStore.filters),
  );

  let dateWiseExpenses = $derived<DateWiseExpense[]>([...getDateWiseExpenses(filteredExpenses)]);

  const specialData: DateWiseExpense[] = [
    {
      id: 'add',
    },
    {
      id: 'filters',
    },
    {
      id: 'total',
    },
  ];

  const expensesMod = $derived([...specialData, ...dateWiseExpenses]);
</script>

<Column>
  <div class="ExpensesDateGroup">
    <VirtualListHolder height="calc(100vh - 75px)">
      <SvelteVirtualList items={expensesMod}>
        {#snippet renderItem(item)}
          <VirtualListItem>
            {#if item.date}
              <DateDisplay data={item.date} />
            {:else if item.expense}
              <ExpenseCard data={item.expense} />
            {:else if item.id === 'add'}
              <div class="create-button-holder">
                <Button href={`/${tripId}/add-expense`} aria-label="Add Expense" color="primary">
                  <Icon icon="material-symbols:add" /> Add Expense
                </Button>
              </div>
            {:else if item.id === 'filters' && useExpensesStore.data?.length}
              <Filters />
            {:else if item.id === 'total'}
              <TripStats expenses={filteredExpenses} />
            {/if}
          </VirtualListItem>
        {/snippet}
      </SvelteVirtualList>
    </VirtualListHolder>
  </div>
</Column>

<style lang="scss">
  .ExpensesDateGroup {
    margin-top: 16px;

    .create-button-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .search-holder {
      margin-bottom: 18px;
    }

    :global(.VirtualListItem) {
      margin-bottom: 4px;
    }

    :global(.virtual-list-items) {
      padding-bottom: 16px;
    }
  }
</style>
