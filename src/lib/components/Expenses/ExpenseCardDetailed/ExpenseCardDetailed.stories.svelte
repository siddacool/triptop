<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseCardDetailed from './ExpenseCardDetailed.svelte';
  import { mockDataExpenses } from '$lib/stores/expense/data/mock-data-expenses';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ExpenseCardDetailed,
    tags: ['autodocs'],
    args: {
      expense: mockDataExpenses[0],
      trip: mockDataTrips[0],
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
