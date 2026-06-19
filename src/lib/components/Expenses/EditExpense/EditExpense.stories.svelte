<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EditExpense from './EditExpense.svelte';
  import { type Expense } from '$lib/stores/expense/types';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';
  import { Category } from '$lib/stores/category/types';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: EditExpense,
    tags: ['autodocs'],
    args: {
      trip: mockDataTrips[0],
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Create" args={{ mode: 'create' }} />

<Story
  name="Edit"
  args={{
    mode: 'edit',
    data: {
      name: 'Dinner at Koko',
      amount: 500,
      category: Category.TRANSPORT,
      date: '2025-05-12',
    } as Expense,
  }}
/>

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <EditExpense mode="create" trip={mockDataTrips[0]} />
  </Theme>
</Story>
