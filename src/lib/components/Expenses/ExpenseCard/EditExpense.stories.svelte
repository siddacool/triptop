<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseCard from './ExpenseCard.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import { mockDataExpenses } from '../data/mock-data-expenses';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ExpenseCard,
    tags: ['autodocs'],
    args: {
      expense: mockDataExpenses[0],
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <ExpenseCard expense={mockDataExpenses[0]} />
  </Theme>
</Story>
