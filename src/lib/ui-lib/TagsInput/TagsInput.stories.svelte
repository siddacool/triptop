<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TagsInput from './TagsInput.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: TagsInput,
    tags: ['autodocs'],
    args: {
      options: ['India', 'US', 'Pakistan', 'China'],
    },
  });
</script>

<Story name="Default" />

<Story name="error" args={{ error: true }} />

<Story name="disabled" args={{ disabled: true }} />
