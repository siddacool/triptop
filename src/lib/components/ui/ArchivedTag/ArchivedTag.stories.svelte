<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ArchivedTag from './ArchivedTag.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ArchivedTag,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <ArchivedTag />
  </Theme>
</Story>
