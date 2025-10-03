<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import InputEnclosure from './InputEnclosure.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: InputEnclosure,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />

<Story name="Focused" args={{ focused: true }} />

<Story name="Error" args={{ error: true }} />

<Story name="Example">
  <input type="text" />
</Story>
