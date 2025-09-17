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
  import Search from '$lib/ui-lib/Search/Search.svelte';
  import { getFilteredExpenses } from '$lib/stores/expense/filters';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import TripStats from '$lib/components/Trip/TripStats';

  const tripId = page.params.tripId;

  let searchTerm = $state('');
  let filteredExpenses = $derived<Expense[]>(
    getFilteredExpenses(useExpensesStore.data || [], {
      search: searchTerm,
    }),
  );
  let dateWiseExpenses = $derived<DateWiseExpense[]>([...getDateWiseExpenses(filteredExpenses)]);

  function onsearchclear() {
    searchTerm = '';
  }

  let listRef = $state();

  const specialData: DateWiseExpense[] = [
    {
      id: 'add',
    },
    {
      id: 'search',
    },
    {
      id: 'total',
    },
  ];

  const expensesMod = $derived([...specialData, ...dateWiseExpenses]);
</script>

<Column>
  <div class="ExpensesDateGroup">
    <SvelteVirtualList items={expensesMod} bind:this={listRef}>
      {#snippet renderItem(item)}
        <div class="listItem">
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
          {:else if item.id === 'search' && useExpensesStore.data?.length}
            <div class="search-holder">
              <Search
                placeholder="Search expenses"
                bind:value={searchTerm}
                onclear={onsearchclear}
              />
            </div>
          {:else if item.id === 'total'}
            <TripStats expenses={filteredExpenses} />
          {/if}
        </div>
      {/snippet}
    </SvelteVirtualList>
  </div>
</Column>

<style lang="scss">
  .ExpensesDateGroup {
    margin-top: 16px;
    height: calc(100vh - 75px);
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;

    .listItem {
      margin-bottom: 4px;
      padding-left: 4px;
      padding-right: 4px;
    }

    .create-button-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .search-holder {
      margin-bottom: 18px;
    }
  }
</style>
