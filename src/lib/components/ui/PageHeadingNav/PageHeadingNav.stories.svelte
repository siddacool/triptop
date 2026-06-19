<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PageHeadingNav from './PageHeadingNav.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: PageHeadingNav,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ href: '/trips' }}>Trip to Pondicherry</Story>
