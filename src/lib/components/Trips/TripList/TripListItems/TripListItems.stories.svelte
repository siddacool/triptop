<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TripListItems from './TripListItems.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import { mockDataTrips } from '$lib/stores/trip/data/mock-data-trips';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: TripListItems,
    tags: ['autodocs'],
    args: { trips: mockDataTrips },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <TripListItems trips={mockDataTrips} />
  </Theme>
</Story>
