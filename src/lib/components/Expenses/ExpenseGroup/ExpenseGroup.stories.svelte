<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseGroup from './ExpenseGroup.svelte';
  import { mockDataExpenses } from '$lib/stores/expense/data/mock-data-expenses';
  import { getGroupExpenses } from '$lib/stores/expense/getters/group-expenses';

  const data = getGroupExpenses(mockDataExpenses);

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ExpenseGroup,
    tags: ['autodocs'],
    args: {
      data: data,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
