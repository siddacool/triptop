<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TheHeader from './TheHeader.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: TheHeader,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <TheHeader />
  </Theme>
</Story>
