<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Card,
    tags: ['autodocs'],
  });
</script>

<Story name="Default">
  <h3>This is a card</h3>
</Story>

<Story name="interactive" args={{ interactive: true }}><h3>Interactive card</h3></Story>
