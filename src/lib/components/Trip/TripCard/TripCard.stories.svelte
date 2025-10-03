<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TripCard from './TripCard.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: TripCard,
    tags: ['autodocs'],
    args: {
      data: {
        id: 1,
        _id: 'abc123',
        name: 'Summer Vacation in Italy',
        expensesUpdatedAt: Date.now(),
        createdAt: 1696348800000, // Example timestamp
        updatedAt: Date.now(),
      },
    },
  });
</script>

<Story name="Default" />
