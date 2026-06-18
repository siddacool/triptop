<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EditTrip from './EditTrip.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: EditTrip,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Create" args={{ mode: 'create' }} />

<Story name="Edit" args={{ mode: 'edit', data: { name: 'U.S.A', currency: 'USD' } as Trip }} />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <EditTrip mode="create" />
  </Theme>
</Story>
