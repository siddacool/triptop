<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Loader from './Loader.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Loader,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
