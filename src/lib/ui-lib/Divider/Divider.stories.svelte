<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Divider from './Divider.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Divider,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />
