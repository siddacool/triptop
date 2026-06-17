<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExpenseDateGroup from './ExpenseDateGroup.svelte';
  import { mockDataExpenses } from '../data/mock-data-expenses';
  import { getGroupExpenses } from '$lib/helpers/group-expenses';

  const data = getGroupExpenses(mockDataExpenses);

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ExpenseDateGroup,
    tags: ['autodocs'],
    args: {
      data: data[0],
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story name="List" asChild>
  <div>
    {#each data as group (group.date)}
      <ExpenseDateGroup data={group} />
    {/each}
  </div>
</Story>
