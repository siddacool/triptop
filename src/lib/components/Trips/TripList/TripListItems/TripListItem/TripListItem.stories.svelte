<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TripListItem from './TripListItem.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import { mockDataTrips } from '../TripListItems.stories.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: TripListItem,
    tags: ['autodocs'],
    args: { trip: mockDataTrips[0] },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <TripListItem trip={mockDataTrips[0]} />
  </Theme>
</Story>
