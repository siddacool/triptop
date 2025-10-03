<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Search from './Search.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Search,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />

<Story name="onclear" args={{ onclear: () => {} }} />

<Story name="error" args={{ error: true }} />

<Story name="disabled" args={{ disabled: true }} />

<Story name="readonly" args={{ readonly: true }} />
