<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import Main from './Main.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Main,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">Hello</Story>

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <Main>Hello</Main>
  </Theme>
</Story>
