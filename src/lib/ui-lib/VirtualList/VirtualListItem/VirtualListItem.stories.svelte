<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VirtualListItem from './VirtualListItem.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: VirtualListItem,
    tags: ['autodocs'],
  });
</script>

<Story name="Default">Test container</Story>
