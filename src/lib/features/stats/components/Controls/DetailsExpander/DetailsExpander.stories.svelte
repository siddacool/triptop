<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DetailsExpander from './DetailsExpander.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: DetailsExpander,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ value: 'normal' }} />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <DetailsExpander value="normal" />
  </Theme>
</Story>
