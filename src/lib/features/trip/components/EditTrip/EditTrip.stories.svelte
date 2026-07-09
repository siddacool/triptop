<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EditTrip from './EditTrip.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import type { Trip } from '../../types';

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
