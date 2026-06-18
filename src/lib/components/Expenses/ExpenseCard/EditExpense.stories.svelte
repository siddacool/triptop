<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseCard from './ExpenseCard.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import { mockDataExpenses } from '$lib/stores/expense/data/mock-data-expenses';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ExpenseCard,
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

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <ExpenseCard expense={mockDataExpenses[0]} trip={mockDataTrips[0]} />
  </Theme>
</Story>
