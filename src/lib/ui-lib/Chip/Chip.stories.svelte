<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Chip from './Chip.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Chip,
    tags: ['autodocs'],
  });
</script>

<Story name="Default">Some info</Story>
