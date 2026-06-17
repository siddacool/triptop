<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BackButton from './BackButton.svelte';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: BackButton,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ href: 'https://triptop.siddheshmangela.com/' }} />

<Story name="Dark mode" asChild>
  <Theme type="dark">
    <BackButton href="https://triptop.siddheshmangela.com/" />
  </Theme>
</Story>
