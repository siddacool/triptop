<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Callout from './Callout.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Callout,
    tags: ['autodocs'],
    args: {
      color: 'primary',
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default">Hello there</Story>

<Story name="Warning" args={{ color: 'warning' }}>This is a warning callout</Story>

<Story name="Small" args={{ size: 'small' }}>This is a tiny callout</Story>
