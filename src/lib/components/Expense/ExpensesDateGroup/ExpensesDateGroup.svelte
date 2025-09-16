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
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { onMount } from 'svelte';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import TripStats from '$lib/components/Trip/TripStats';

  const tripId = page.params.tripId;

  let searchTerm = $state('');
  let filteredExpenses = $state<Expense[]>([]);
  let dateWiseExpenses = $state<DateWiseExpense[]>([]);

  function onsearchclear() {
    searchTerm = '';
  }

  onMount(async () => {
    if (!tripId) {
      return;
    }

    await useTripStore.fetch(tripId);
    await useExpensesStore.fetch(tripId);
  });

  onMount(() => {
    return () => {
      useTripStore.reset();
      useExpensesStore.reset();
    };
  });

  $effect(() => {
    filteredExpenses = getFilteredExpenses(useExpensesStore.data || [], {
      search: searchTerm,
    });
  });

  $effect(() => {
    dateWiseExpenses = [...getDateWiseExpenses(filteredExpenses)];
  });

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
          {:else if item.id === 'search'}
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
    height: calc(100vh - 95px);

    .listItem {
      margin-bottom: 4px;
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
