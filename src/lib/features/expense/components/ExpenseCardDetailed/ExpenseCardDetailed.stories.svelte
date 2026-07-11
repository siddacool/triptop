<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseCardDetailed from './ExpenseCardDetailed.svelte';
  import { mockDataExpenses } from '$lib/features/expense/mocks/mock-data-expenses';
  import { mockDataTrips } from '$lib/features/trip/mocks/mock-data-trips';

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
