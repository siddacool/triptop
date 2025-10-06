<script lang="ts">
  import { useExpensesStore } from '$lib/stores/expense/list.svelte';
  import { Column } from '@flightlesslabs/grid';
  import { page } from '$app/state';
  import { useExpenseFiltersStore } from '$lib/stores/expense/filters/index.svelte';
  import ExpensesDateGroupTemplate from './ExpensesDateGroupTemplate/ExpensesDateGroupTemplate.svelte';

  const tripId = page.params.tripId;
</script>

<Column>
  <ExpensesDateGroupTemplate
    data={useExpensesStore.data}
    tripId={tripId || ''}
    filters={useExpenseFiltersStore.filters}
    height="calc(100vh - 75px)"
  />
</Column>
